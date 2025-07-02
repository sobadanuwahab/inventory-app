import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function BarangKeluarReportPage() {
  const [dataKeluar, setDataKeluar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/keluar")
      .then((res) => {
        setDataKeluar(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-red-700">
        Laporan Barang Keluar
      </h1>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="w-full bg-white rounded shadow text-left text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2">Nama</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {dataKeluar.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Tidak ada data barang keluar.
                </td>
              </tr>
            ) : (
              dataKeluar.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.nama}</td>
                  <td className="p-2">{item.jumlah}</td>
                  <td className="p-2">{item.tanggal}</td>
                  <td className="p-2">{item.keterangan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
