import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTicket,
  faChartBar,
  faFileLines,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "Guest", role: "" });

  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        const id = parsed.id;

        axios
          .get(`http://localhost:5000/api/auth/me/${id}`)
          .then((res) => setUser(res.data))
          .catch(() => setUser({ username: "Unknown", role: "" }));
      } catch (e) {
        console.error("Gagal parsing user:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed z-50 top-0 left-0 w-64 bg-white shadow-lg min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out
    ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:relative md:translate-x-0`}
    >
      {/* Close button (mobile) */}
      <div className="md:hidden flex justify-end p-3">
        <button onClick={onClose} className="text-xl text-slate-600">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Logo Header */}
      <div className="bg-slate-600 py-4 px-5 flex items-center justify-center h-20">
        <img src="/cinemaxxi.png" alt="Logo" className="h-9" />
      </div>

      {/* Profile */}
      <div className="p-4 flex flex-col items-center text-center border-b">
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}`}
          alt="avatar"
          className="w-16 h-16 rounded-full mb-2"
        />
        <div className="text-sm font-semibold capitalize">
          Welcome, {user.username}
        </div>
        <div className="text-xs text-gray-500 capitalize">{user.role}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 text-sm">
        <Link
          to="/dashboard"
          className={`block px-4 py-2 rounded hover:bg-slate-400 mb-1 ${
            isActive("/dashboard")
              ? "bg-slate-500 text-white font-semibold"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faChartBar} className="mr-2" />
          Dashboard
        </Link>

        <Link
          to="/ticket/input"
          className={`block px-4 py-2 mt-2 rounded hover:bg-slate-400 ${
            isActive("/ticket/input")
              ? "bg-slate-500 text-white font-semibold"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faTicket} className="mr-2" />
          Input Tiket Penonton
        </Link>

        <Link
          to="/ticket/laporan"
          className={`block px-4 py-2 mt-1 rounded hover:bg-slate-400 ${
            isActive("/ticket/laporan")
              ? "bg-slate-500 text-white font-semibold"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faFileLines} className="mr-2" />
          Laporan Tiket Penonton
        </Link>

        <Link
          to="/parkir/input"
          className={`block px-4 py-2 mt-2 rounded hover:bg-slate-400 ${
            isActive("/parkir/input")
              ? "bg-slate-500 text-white font-semibold"
              : ""
          }`}
        >
          🚗 Data Member Parkir
        </Link>

        <Link
          to="/parkir/laporan"
          className={`block px-4 py-2 mt-1 rounded hover:bg-slate-400 ${
            isActive("/parkir/laporan")
              ? "bg-slate-500 text-white font-semibold"
              : ""
          }`}
        >
          📋 Laporan Member Parkir
        </Link>
      </nav>

      {/* Logout - Diletakkan paling bawah */}
      <div className="bg-slate-600 border-t h-16 flex items-center justify-center mt-auto">
        <button
          onClick={handleLogout}
          className="text-white text-sm hover:underline"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
          Logout
        </button>
      </div>
    </aside>
  );
}
