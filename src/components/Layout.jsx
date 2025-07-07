import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  const [show, setShow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stored = localStorage.getItem("user");
  const currentUser = stored ? JSON.parse(stored) : null;
  const lokasiBioskop = currentUser?.lokasi_bioskop || "LOKASI_BIOSKOP...";

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div
          className={`transition-opacity duration-700 ease-in-out flex flex-col h-screen ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header */}
          <header className="bg-white shadow px-4 py-4 flex items-center justify-center h-20 relative">
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-4 md:hidden text-slate-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <h1
              className="text-4xl font-semibold text-yellow-500 uppercase tracking-widest text-center w-full"
              style={{ fontFamily: "Russo One, Bungee, Poppins, sans-serif" }}
            >
              {lokasiBioskop}
            </h1>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>

          {/* Footer */}
          <footer className="bg-white text-center text-sm text-gray-500 h-16 flex items-center justify-center border-t">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://sobadanu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium mx-1"
            >
              SobaDanuWahab | Web Developer
            </a>
            . All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
