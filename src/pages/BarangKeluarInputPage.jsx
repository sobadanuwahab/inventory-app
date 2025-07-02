import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function BarangKeluarInputPage() {
  const [formData, setFormData] = useState({
    nama: "",
    jumlah: "",
    tanggal: new Date().toISOString().split("T")[0],
    keterangan: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/keluar",
        formData
      );
      console.log("Respon:", res.data);
      setStatus("✅ Data berhasil disimpan");
      setFormData({
        nama: "",
        jumlah: "",
        tanggal: new Date().toISOString().split("T")[0],
        keterangan: "",
      });
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setStatus("❌ Gagal menyimpan data");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-red-700">
        Input Barang Keluar
      </h1>

      {status && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            status.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow max-w-xl"
      >
        <input
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Nama Barang"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="jumlah"
          value={formData.jumlah}
          onChange={handleChange}
          type="number"
          placeholder="Jumlah"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          type="date"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          placeholder="Keterangan"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded"
        >
          Simpan
        </button>
      </form>
    </Layout>
  );
}
