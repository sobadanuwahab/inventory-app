import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function TicketMasukLaporanPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    tanggal: "",
    lokasi: "",
  });

  const stored = localStorage.getItem("user");
  const currentUser = stored ? JSON.parse(stored) : null;
  const user_id = currentUser?.id;
  const role = currentUser?.role;

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleFilter = async (e) => {
    e.preventDefault();
    setIsFiltered(true);
    setLoading(true);
    try {
      const params = {
        tanggal: filters.tanggal,
        lokasi: filters.lokasi,
        user_id,
        role,
      };

      const res = await axios.get("http://localhost:5000/api/ticket", {
        params,
      });
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch tiket:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-[670px] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-cinema3.jpeg')" }}
      >
        <div className="px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-12 md:px-8 md:pt-8 md:pb-12 lg:px-12 lg:pt-12 lg:pb-16">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Laporan Tiket Penonton
          </h1>

          {/* Filter Form */}
          <form
            onSubmit={handleFilter}
            className="mb-4 flex flex-wrap gap-4 items-end bg-white p-4 rounded shadow"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={filters.tanggal}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Lokasi Studio
              </label>
              <select
                name="lokasi"
                value={filters.lokasi}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">-- Semua Lokasi --</option>
                <option value="STUDIO 1">STUDIO 1</option>
                <option value="STUDIO 2">STUDIO 2</option>
                <option value="STUDIO 3">STUDIO 3</option>
                <option value="STUDIO 4">STUDIO 4</option>
                <option value="STUDIO 5">STUDIO 5</option>
                <option value="STUDIO 6">STUDIO 6</option>
                <option value="STUDIO PREMIERE 1">STUDIO PREMIERE 1</option>
                <option value="STUDIO PREMIERE 2">STUDIO PREMIERE 2</option>
                <option value="STUDIO IMAX">STUDIO IMAX</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
            >
              Tampilkan Data
            </button>
          </form>

          {/* Tabel Data */}
          {isFiltered && (
            <>
              {loading ? (
                <p>Memuat data...</p>
              ) : data.length === 0 ? (
                <p className="text-gray-500">Tidak ada data ditemukan.</p>
              ) : (
                <table className="w-full bg-white border border-gray-400 border-collapse text-sm text-center">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-2 border border-gray-300">No</th>
                      <th className="p-2 border border-gray-300">Tanggal</th>
                      <th className="p-2 border border-gray-300">Show</th>
                      <th className="p-2 border border-gray-300">Judul Film</th>
                      <th className="p-2 border border-gray-300">Studio</th>
                      <th className="p-2 border border-gray-300">Petugas</th>
                      <th className="p-2 border border-gray-300">
                        Jumlah Tiket
                      </th>
                      <th className="p-2 border border-gray-300">
                        Jumlah Penonton
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-2 border border-gray-300">{i + 1}</td>
                        <td className="p-2 border border-gray-300 text-sm text-gray-500">
                          {new Date(item.tanggal).toLocaleString()}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.data_show}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.judul_film}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.lokasi_studio}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.petugas}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.jumlah_masuk}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.jumlah_penonton}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
