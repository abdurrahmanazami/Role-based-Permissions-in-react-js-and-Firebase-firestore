import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { secondaryAuth, db } from "../firebase";
import { useState } from "react";

export default function CreateUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const createUser = async (e) => {
    e.preventDefault();

    // ✅ Create user WITHOUT affecting admin session
    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email.trim(),
      password.trim()
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role,
      status: "active",
      createdAt: serverTimestamp(),
    });

    // admin is logged out → force re-login
    alert("User created. Please login again as admin.");
    // await signOut(auth);
  };

  return (
    <form onSubmit={createUser}>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <select onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="manager">Manager</option>
      </select>

      <button>Create</button>
    </form>
  );
}
