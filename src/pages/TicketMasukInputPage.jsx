import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function TicketMasukInputPage() {
  const [form, setForm] = useState({
    judul_film: "",
    lokasi_studio: "",
    petugas: "",
    jumlah_masuk: "",
    jumlah_penonton: "",
    keterangan: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ticket", form);
      alert("Tiket masuk berhasil disimpan!");
      navigate("/dashboard");
      setForm({
        judul_film: "",
        lokasi_studio: "",
        petugas: "",
        jumlah_masuk: "",
        jumlah_penonton: "",
        keterangan: "",
      });
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <Layout>
      <div
        className="flex min-h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-cinema.jpg')" }}
      >
        {/* Kiri (kosong atau bisa berisi ilustrasi/branding) */}
        <div className="w-1/2 hidden lg:block"></div>

        {/* Kanan (form input) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-xl w-full space-y-4 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-slate-700">
              Input Tiket Masuk
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="judul_film"
                value={form.judul_film}
                onChange={handleChange}
                placeholder="Judul Film"
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="lokasi_studio"
                value={form.lokasi_studio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Pilih Lokasi Studio --</option>
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
              <input
                name="petugas"
                value={form.petugas}
                onChange={handleChange}
                placeholder="Petugas"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="jumlah_masuk"
                value={form.jumlah_masuk}
                onChange={handleChange}
                placeholder="Jumlah Tiket"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="jumlah_penonton"
                value={form.jumlah_penonton}
                onChange={handleChange}
                placeholder="Jumlah Penonton"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="keterangan"
                value={form.keterangan}
                onChange={handleChange}
                placeholder="Keterangan"
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
