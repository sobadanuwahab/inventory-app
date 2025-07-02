import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-3 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              className="w-8 h-8 rounded-full"
              alt="Admin"
            />
            <span className="text-sm text-gray-700">Admin</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
