import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faFilm, faVideo } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [studioList, setStudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay animasi sedikit setelah render
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Ambil daftar studio & laporan tiket hari ini
    const fetchData = async () => {
      try {
        const [studioRes, tiketRes] = await Promise.all([
          axios.get("http://localhost:5000/api/studio"),
          axios.get("http://localhost:5000/api/ticket/summary/group-today"),
        ]);

        // Gabungkan
        const merged = studioRes.data.map((studio) => {
          const found = tiketRes.data.find(
            (s) => s.lokasi_studio === studio.nama
          );
          return {
            lokasi_studio: studio.nama,
            film: found ? found.film : [],
          };
        });

        setStudioList(merged);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="min-h-[580px] bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-cinema2.jpg')" }}
        >
          <div className="px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-12 md:px-8 md:pt-8 md:pb-12 lg:px-12 lg:pt-12 lg:pb-16">
            <h1 className="text-4xl font-bold mb-8 text-white text-center">
              Dashboard Monitoring Tiket
            </h1>
            {loading ? (
              <p>Memuat data...</p>
            ) : studioList.length === 0 ? (
              <p className="text-gray-500">Belum ada data studio.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {studioList.map((studio, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded shadow border border-gray-200"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                      <span>
                        <FontAwesomeIcon icon={faCouch} />{" "}
                        {studio.lokasi_studio}
                      </span>
                      <span className="text-xs text-gray-500 font-normal">
                        {new Date().toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </h2>

                    <ul className="mt-2 space-y-1">
                      {studio.film.length === 0 ? (
                        <li className="text-sm text-gray-400 italic">
                          Belum ada input hari ini
                        </li>
                      ) : (
                        studio.film.map((film, j) => (
                          <li
                            key={j}
                            className="text-sm text-gray-700 flex justify-between border-b pb-1"
                          >
                            <span>
                              {" "}
                              <FontAwesomeIcon icon={faFilm} />{" "}
                              {film.judul_film}
                            </span>
                            <span className="font-bold text-red-500">
                              {film.total_penonton} / Penonton
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
