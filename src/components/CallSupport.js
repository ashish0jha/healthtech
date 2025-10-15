import { useRef, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const CallSupport = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [callLogs, setCallLogs] = useState([]);
  const ringAudio = useRef(null);

  useEffect(() => {
    ringAudio.current = new Audio("/ring.mp3");
    ringAudio.current.loop = true;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;
      const ref = doc(db, "callHistory", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCallLogs(snap.data().calls || []);
      }
    };
    fetchLogs();
  }, [userId]);

  const logCall = async (status = "Completed", duration = "1 min") => {
    if (!userId) return;
    const ref = doc(db, "callHistory", userId);
    const entry = {
      type: "Support",
      time: new Date().toISOString(),
      duration,
      status,
    };
    await setDoc(ref, { calls: arrayUnion(entry) }, { merge: true });
    setCallLogs((prev) => [...prev, entry]);
  };

  const markAvailability = async (available) => {
    const ref = doc(db, "callStatus", "global");
    await setDoc(ref, { available, timestamp: serverTimestamp() }, { merge: true });
  };

  const checkAvailability = async () => {
    const ref = doc(db, "callStatus", "global");
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() : {};
    return data.available === true;
  };

  const startCall = async () => {
    try {
      setIsCalling(true);
      setMessage("Ringing support...");
      ringAudio.current.play();

      await markAvailability(true);

      const available = await checkAvailability();
      if (!available) {
        setTimeout(() => {
          ringAudio.current.pause();
          ringAudio.current.currentTime = 0;
          setMessage("No support available. Please try again later.");
          endCall();
        }, 60000); // 1 minute timeout
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      peerConnectionRef.current = new RTCPeerConnection();
      stream.getTracks().forEach((track) =>
        peerConnectionRef.current.addTrack(track, stream)
      );

      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      const remoteConnection = new RTCPeerConnection();
      remoteConnection.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };
      stream.getTracks().forEach((track) =>
        remoteConnection.addTrack(track, stream)
      );

      await remoteConnection.setRemoteDescription(offer);
      const answer = await remoteConnection.createAnswer();
      await remoteConnection.setLocalDescription(answer);
      await peerConnectionRef.current.setRemoteDescription(answer);

      ringAudio.current.pause();
      ringAudio.current.currentTime = 0;
      setMessage("Call in progress...");
      logCall("Started", "Live");
    } catch (error) {
      console.error("Error starting call:", error);
      alert("Could not start call. Please allow camera and mic access.");
      setIsCalling(false);
      setMessage("");
      ringAudio.current.pause();
      ringAudio.current.currentTime = 0;
    }
  };

  const endCall = () => {
    setIsCalling(false);
    setMessage("Call ended.");
    markAvailability(false);
    logCall("Ended", "1 min");

    if (peerConnectionRef.current) peerConnectionRef.current.close();

    const stream = localVideoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());

    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    ringAudio.current.pause();
    ringAudio.current.currentTime = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Live Call Support</h1>
      <p className="text-gray-600 mb-2">
        Start a secure peer-to-peer video session (demo preview).
      </p>
      {message && <p className="text-sm text-indigo-600 mb-4">{message}</p>}

      <div className="flex flex-wrap gap-6 justify-center">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-64 h-48 rounded-2xl shadow-md border border-indigo-300 bg-black"
        ></video>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-64 h-48 rounded-2xl shadow-md border border-indigo-300 bg-black"
        ></video>
      </div>

      <div className="mt-6 flex gap-4">
        {!isCalling ? (
          <button
            onClick={startCall}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-md"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={endCall}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-md"
          >
            End Call
          </button>
        )}
      </div>

      {/* Call History Log */}
      {callLogs.length > 0 && (
        <div className="mt-8 w-full max-w-xl bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">📋 Call History</h3>
          <ul className="space-y-2 text-left text-sm text-gray-700">
            {callLogs.map((log, i) => (
              <li key={i} className="border-b pb-2">
                <strong>{log.type}</strong> — {log.status} on{" "}
                {new Date(log.time).toLocaleString()} ({log.duration})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CallSupport;