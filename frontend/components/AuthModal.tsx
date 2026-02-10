import React, { useState } from "react";
import { User } from "../types";

interface AuthModalProps {
  onLogin: (user: User) => void;
  theme: "light" | "dark";
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, theme }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(
    "https://picsum.photos/seed/cyber-default/100/100"
  );
  const [loading, setLoading] = useState(false);

  const avatars = [
    "https://picsum.photos/seed/security1/100/100",
    "https://picsum.photos/seed/security2/100/100",
    "https://picsum.photos/seed/security3/100/100",
    "https://picsum.photos/seed/security4/100/100",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      const newUser: User = {
        id: data.user._id,
        name: data.user.name,
        bio,
        avatar,
      };

      // store token for future use
      localStorage.setItem("token", data.token || "");

      onLogin(newUser);
    } catch (err) {
      alert("Server error. Make sure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border p-8 ${theme === "dark"
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
          }`}
      >
        <h1 className="text-3xl font-black text-center mb-6">
          Codevirus <span className="text-blue-500">Insights</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          <div className="flex gap-2">
            {avatars.map((av, i) => (
              <img
                key={i}
                src={av}
                onClick={() => setAvatar(av)}
                className={`w-10 h-10 rounded cursor-pointer border-2 ${avatar === av ? "border-blue-500" : "border-transparent"
                  }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded font-bold"
          >
            {loading ? "Creating..." : "INITIALIZE ACCOUNT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
