import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function MemberParkirReportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/member-parkir");
      setData(res.data);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/member-parkir/${id}`);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Laporan Member Parkir
      </h1>
      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Tidak ada data tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-sm text-center border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">Nama STNK</th>
                <th className="p-2 border">Nomor Kartu</th>
                <th className="p-2 border">Nama Pemilik</th>
                <th className="p-2 border">Plat Nomor</th>
                <th className="p-2 border">Jenis Kendaraan</th>
                <th className="p-2 border">No. Telp</th>
                <th className="p-2 border">Tanggal Registrasi</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{item.nama_stnk}</td>
                  <td className="p-2 border">{item.nomor_kartu}</td>
                  <td className="p-2 border">{item.nama_pemilik}</td>
                  <td className="p-2 border">{item.plat_nomor}</td>
                  <td className="p-2 border">{item.jenis_kendaraan}</td>
                  <td className="p-2 border">{item.no_telp}</td>
                  <td className="p-2 border">
                    {new Date(item.tanggal_registrasi).toLocaleDateString()}
                  </td>
                  <td className="p-2 border space-x-2">
                    {/* Tombol Edit (opsional redirect ke halaman edit) */}
                    <button
                      onClick={() =>
                        alert("Fitur edit bisa diarahkan ke form edit.")
                      }
                      className="bg-yellow-400 px-2 py-1 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 px-2 py-1 rounded text-white"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
