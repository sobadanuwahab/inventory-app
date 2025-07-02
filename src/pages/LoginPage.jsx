import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form login:", form);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      if (res.data && res.data.user && res.data.token) {
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Login gagal: respon tidak valid dari server");
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setError("Login gagal. Periksa kembali username/password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login Admin/User</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
