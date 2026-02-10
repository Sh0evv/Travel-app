  "use client";

  import { useEffect, useState } from "react";
  import { Globe, Star } from "lucide-react";
  import { useRouter } from "next/navigation";
  import { getToken } from "@/lib/auth";

  interface Destination {
    id: number;
    title: string;
    country: string;
    cover_image: string;
    rating: number;
  }

  export default function ToursPage() {
    const router = useRouter();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [filtered, setFiltered] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [countryFilter, setCountryFilter] = useState("All");

    useEffect(() => {
      const token = getToken();
      if (!token) {
        setError("Войдите в систему, чтобы просматривать туры");
        setLoading(false);
        return;
      }

      const fetchDestinations = async () => {
        try {
          const res = await fetch(
            "https://student2.softclub.tj/destinations/destinations",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );

          if (!res.ok) {
            if (res.status === 403) {
              throw new Error("Доступ запрещён. Проверьте токен или права пользователя.");
            } else {
              throw new Error(`Ошибка сервера: ${res.status}`);
            }
          }

          const data = await res.json();
          const arr = Array.isArray(data) ? data : [];
          setDestinations(arr);
          setFiltered(arr);
        } catch (err: any) {
          console.error("Ошибка загрузки destinations:", err);
          setError(err.message || "Не удалось загрузить туры");
        } finally {
          setLoading(false);
        }
      };

      fetchDestinations();
    }, []);

    useEffect(() => {
      if (countryFilter === "All") {
        setFiltered(destinations);
      } else {
        setFiltered(destinations.filter((d) => d.country === countryFilter));
      }
    }, [countryFilter, destinations]);

    if (loading)
      return <p className="text-center py-20 text-gray-500 text-lg font-medium">Загрузка туров...</p>;

    if (error)
      return (
        <p className="text-center py-20 text-red-500 text-lg font-medium">
          {error}
        </p>
      );

    const countries = ["All", ...Array.from(new Set(destinations.map((d) => d.country).filter(Boolean)))];

    return (
      <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">

          {/* Фильтры */}
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-64 flex-shrink-0">
            <h3 className="font-semibold text-xl mb-6 text-gray-800">Filters</h3>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2 text-gray-600">Country</label>
              <select
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-400"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2 text-gray-600">Tour Type</label>
              <select className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 cursor-not-allowed" disabled>
                <option>All</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2 text-gray-600">Max Price</label>
              <input type="range" min={0} max={3000} className="w-full h-2 rounded-lg accent-indigo-500 cursor-not-allowed" disabled />
            </div>
          </div>

          {/* Сетка туров */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.length === 0 && (
              <p className="text-gray-500 col-span-full text-center mt-10 text-lg">
                Нет доступных туров
              </p>
            )}

            {filtered.map((dest) => (
              <div
                key={dest.id}
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-500 cursor-pointer group bg-white"
                onClick={() => router.push(`/bookings/${dest.id}`)}
              >
                {/* Картинка */}
                <div className="relative overflow-hidden">
                  <img
                    src={dest.cover_image}
                    alt={dest.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Shine эффект */}
                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-30 transform -translate-x-20 rotate-12 transition-all duration-700 pointer-events-none"></div>
                </div>

                {/* Текстовый блок с белым фоном */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white rounded-t-3xl shadow-lg text-gray-900">
                  <p className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <Globe size={14} /> {dest.country}
                  </p>
                  <h3 className="font-bold text-lg">{dest.title}</h3>
                  <p className="flex items-center gap-1 text-yellow-400 font-semibold mt-1">
                    <Star size={14} /> {dest.rating.toFixed(1)}
                  </p>
                </div>

              </div>
            ))}


          </div>

        </div>
      </div>
    );
  }
