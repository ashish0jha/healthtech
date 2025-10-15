import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const name = user?.displayName?.split(" (")[0];
  const type = user?.displayName?.split(" (")[1]?.replace(")", "");

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center pt-20 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Welcome, {name}</h2>
        <p className="text-gray-600 mb-6">Here are your account details:</p>
        <div className="space-y-3 text-left text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dashboard Type:</span>
            <span>{type || "Student"}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
