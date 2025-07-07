import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // 3 detik

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-500 text-white text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4 animate-pulse">
          Selamat Datang di Aplikasi Monitoring Tiket
        </h1>
        <p className="text-lg">Menyiapkan halaman...</p>
      </div>
    </div>
  );
}
