import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { role } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your role: {role}</p>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}
