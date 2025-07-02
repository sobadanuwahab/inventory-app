import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // ✅ di folder yang sama

// Halaman Umum
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

// Halaman Login-Protected
import Dashboard from "../pages/Dashboard";
import BarangMasukInputPage from "../pages/BarangMasukInputPage";
import BarangMasukReportPage from "../pages/BarangMasukReportPage";
import BarangKeluarInputPage from "../pages/BarangKeluarInputPage";
import BarangKeluarReportPage from "../pages/BarangKeluarReportPage";
import LaporanStokPage from "../pages/LaporanStokPage";

// Fallback
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Halaman Umum */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Halaman Terproteksi */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/barang-masuk/input"
        element={
          <PrivateRoute>
            <BarangMasukInputPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/barang-masuk/laporan"
        element={
          <PrivateRoute>
            <BarangMasukReportPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/barang-keluar/input"
        element={
          <PrivateRoute>
            <BarangKeluarInputPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/barang-keluar/laporan"
        element={
          <PrivateRoute>
            <BarangKeluarReportPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/laporan/stok"
        element={
          <PrivateRoute>
            <LaporanStokPage />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
