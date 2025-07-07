import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faFilm } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [studioList, setStudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem("user");
        const user = stored ? JSON.parse(stored) : null;
        const user_id = user?.id;
        const role = user?.role;

        const res = await axios.get(
          "http://localhost:5000/api/ticket/summary/group-today",
          {
            params: { user_id, role },
          }
        );

        if (res.data.length > 0) {
          setStudioList(res.data);
          setHasData(true);
        } else {
          setHasData(false);
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setHasData(false);
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
          <div className="px-4 pt-4 pb-12 sm:px-6 md:px-8 lg:px-12">
            <h1 className="text-4xl font-bold mb-8 text-white text-center">
              Dashboard Monitoring Tiket
            </h1>

            {loading ? (
              <p className="text-white text-center">Memuat data...</p>
            ) : !hasData ? (
              <p className="text-white text-center text-lg italic">
                Belum ada data yang diinput hari ini.
              </p>
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
                        {new Date().toLocaleDateString("id-ID")}
                      </span>
                    </h2>

                    <ul className="mt-2 space-y-1">
                      {studio.film.map((film, j) => (
                        <li
                          key={j}
                          className="text-sm text-gray-700 flex justify-between border-b pb-1"
                        >
                          <span>
                            <FontAwesomeIcon icon={faFilm} /> {film.judul_film}{" "}
                            <span className="text-xs text-gray-500">
                              ({film.show})
                            </span>
                          </span>
                          <span className="font-bold text-red-500">
                            {film.total_penonton} / Penonton
                          </span>
                        </li>
                      ))}
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
