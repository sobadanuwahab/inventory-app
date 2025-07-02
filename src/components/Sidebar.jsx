import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openTransaksi, setOpenTransaksi] = useState(true);
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
    <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4 text-center font-bold text-lg">
        Inventory Barang
      </div>

      {/* Profile Section */}
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
          className={`block px-4 py-2 rounded hover:bg-blue-100 mb-1 ${
            isActive("/dashboard") ? "bg-blue-600 text-white font-semibold" : ""
          }`}
        >
          📊 Dashboard
        </Link>

        {/* Transaksi */}
        <div>
          <button
            onClick={() => setOpenTransaksi(!openTransaksi)}
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-100 mb-1 font-medium"
          >
            🔁 Activity
          </button>
          {openTransaksi && (
            <div className="ml-4 mt-1 space-y-1 text-gray-700">
              <Link
                to="/barang-masuk/input"
                className={`block px-3 py-1 rounded hover:bg-gray-100 ${
                  isActive("/barang-masuk/input")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                • Input Barang Masuk
              </Link>
              <Link
                to="/barang-masuk/laporan"
                className={`block px-3 py-1 rounded hover:bg-gray-100 ${
                  isActive("/barang-masuk/laporan")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                • Laporan Barang Masuk
              </Link>
              <Link
                to="/barang-keluar/input"
                className={`block px-3 py-1 rounded hover:bg-gray-100 ${
                  isActive("/barang-keluar/input")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                • Input Barang Keluar
              </Link>
              <Link
                to="/barang-keluar/laporan"
                className={`block px-3 py-1 rounded hover:bg-gray-100 ${
                  isActive("/barang-keluar/laporan")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                • Laporan Barang Keluar
              </Link>
            </div>
          )}
        </div>

        {/* Laporan Umum */}
        <Link
          to="/laporan/stok"
          className={`block px-4 py-2 mt-3 rounded hover:bg-blue-100 ${
            isActive("/laporan/stok")
              ? "bg-blue-600 text-white font-semibold"
              : ""
          }`}
        >
          📄 Laporan Stok
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t text-sm">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline w-full text-left"
        >
          🔓 Logout
        </button>
      </div>
    </aside>
  );
}
