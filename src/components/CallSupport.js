import { useRef, useState } from "react";

const CallSupport = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);

  const startCall = async () => {
    try {
      setIsCalling(true);

      // Get mic and camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      // Create a new RTCPeerConnection
      peerConnectionRef.current = new RTCPeerConnection();

      // Add local stream tracks
      stream.getTracks().forEach((track) =>
        peerConnectionRef.current.addTrack(track, stream)
      );

      // Display remote stream when received
      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Local peer offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      // Simulate remote peer (self connection)
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
    } catch (error) {
      console.error("Error starting call:", error);
      alert("Could not start call. Please allow camera and mic access.");
      setIsCalling(false);
    }
  };

  const endCall = () => {
    setIsCalling(false);
    if (peerConnectionRef.current) peerConnectionRef.current.close();

    // Stop local video
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Live Call Support</h1>
      <p className="text-gray-600 mb-6">
        Start a secure peer-to-peer video session (for demo, local preview).
      </p>

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
    </div>
  );
};

export default CallSupport;