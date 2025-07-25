import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // ✅ di folder yang sama

// Halaman Umum
import WelcomeScreen from "../pages/WelcomeScreen";
import LoginPage from "../pages/LoginPage";

// Halaman Login-Protected
import Dashboard from "../pages/Dashboard";
import TicketMasukInputPage from "../pages/TicketMasukInputPage";
import TicketMasukLaporanPage from "../pages/TicketMasukLaporanPage";
import MemberParkirInputPage from "../pages/MemberParkirInputPage";
import MemberParkirReportPage from "../pages/MemberParkirReportPage";

// Fallback
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Halaman Umum */}
      <Route path="/welcome" element={<WelcomeScreen />} />
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
        path="/ticket/input"
        element={
          <PrivateRoute>
            <TicketMasukInputPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ticket/laporan"
        element={
          <PrivateRoute>
            <TicketMasukLaporanPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/parkir/input"
        element={
          <PrivateRoute>
            <MemberParkirInputPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/parkir/laporan"
        element={
          <PrivateRoute>
            <MemberParkirReportPage />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
