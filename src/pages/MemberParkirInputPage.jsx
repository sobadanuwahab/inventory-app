import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function MemberParkirInputPage() {
  const [form, setForm] = useState({
    nama_stnk: "",
    nomor_kartu: "",
    nama_pemilik: "",
    plat_nomor: "",
    jenis_kendaraan: "",
    no_telp: "",
    tanggal_registrasi: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/member-parkir", form);
      alert("Data member parkir berhasil disimpan!");
      setForm({
        nama_stnk: "",
        nomor_kartu: "",
        nama_pemilik: "",
        plat_nomor: "",
        jenis_kendaraan: "",
        no_telp: "",
        tanggal_registrasi: "",
      });
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-slate-700">
        Input Data Member Parkir
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow max-w-xl"
      >
        <input
          name="nama_stnk"
          value={form.nama_stnk}
          onChange={handleChange}
          placeholder="Nama STNK"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="nomor_kartu"
          value={form.nomor_kartu}
          onChange={handleChange}
          placeholder="Nomor Kartu"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="nama_pemilik"
          value={form.nama_pemilik}
          onChange={handleChange}
          placeholder="Nama Pemilik"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="plat_nomor"
          value={form.plat_nomor}
          onChange={handleChange}
          placeholder="Plat Nomor Kendaraan"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="jenis_kendaraan"
          value={form.jenis_kendaraan}
          onChange={handleChange}
          placeholder="Jenis Kendaraan"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="no_telp"
          value={form.no_telp}
          onChange={handleChange}
          placeholder="No. Telepon"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="tanggal_registrasi"
          value={form.tanggal_registrasi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Simpan
        </button>
      </form>
    </Layout>
  );
}
