import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Firebase Auth login

      const cred = await signInWithEmailAndPassword(auth, email, password);



      // 2️⃣ Get role from Firestore
      const snap = await getDoc(doc(db, "users", cred.user.uid));
     

      if (!snap.exists()) {
        alert("No role assigned. Contact admin.");
        setLoading(false);
        return;
      }
      const role = snap.data().role;

      // 3️⃣ Redirect based on role
      if (role === "admin") navigate("/admin");
      else if (role === "manager") navigate("/manager");
      else navigate("/user");

    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="container-fluid" style={{ maxWidth: '350px' }}>
    <div className="card ">
        <div className="card-body">
    <form onSubmit={login}>
     <label htmlFor="exampleFormControlInput1" className="form-label">Login</label>
      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={e=>setEmail(e.target.value)} />
      <input type="password" id="inputPassword5" className=" form-control mt-3" aria-describedby="passwordHelpBlock" onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary mt-3">Login</button>
      
    </form>
    </div>
    </div>
    </div>
    </div>
  );
}
