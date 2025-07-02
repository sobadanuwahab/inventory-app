import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Barang Masuk</h2>
          <p className="text-2xl mt-2 font-bold text-green-500">150</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Barang Keluar</h2>
          <p className="text-2xl mt-2 font-bold text-red-500">75</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Sisa Stok</h2>
          <p className="text-2xl mt-2 font-bold text-blue-500">75</p>
        </div>
      </div>
    </Layout>
  );
}
