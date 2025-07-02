import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function LaporanStokPage() {
  const [stok, setStok] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/laporan/stok").then((res) => {
      setStok(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Laporan Stok Terkini
      </h1>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Nama Barang</th>
              <th className="p-2 text-right">Total Masuk</th>
              <th className="p-2 text-right">Total Keluar</th>
              <th className="p-2 text-right">Stok Tersisa</th>
            </tr>
          </thead>
          <tbody>
            {stok.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2">{item.nama}</td>
                <td className="p-2 text-right">{item.total_masuk}</td>
                <td className="p-2 text-right">{item.total_keluar}</td>
                <td className="p-2 text-right font-semibold">
                  {item.stok_tersisa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
