"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Calendar, Users, DollarSign } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  destinationId: number;
  pricePerPerson?: number;
}

export default function BookingForm({
  destinationId,
  pricePerPerson = 100,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    travelers_count: 1,
  });

  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState<any>(null);
  const [loadingDestination, setLoadingDestination] = useState(true);

  // Снэкбар
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // FETCH DESTINATION
  useEffect(() => {
    async function loadDestination() {
      try {
        const res = await fetch(
          `https://student2.softclub.tj/destinations/destinations/${destinationId}`
        );
        const data = await res.json();
        const finalData = data?.data || data;
        setDestination(finalData);
      } catch (err) {
        console.error("Destination load error:", err);
      } finally {
        setLoadingDestination(false);
      }
    }
    loadDestination();
  }, [destinationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "travelers_count"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleBooking = async () => {
    const token = getToken();
    if (!token) {
      setSnackbar({ open: true, message: "Сначала войдите в систему", severity: "error" });
      return;
    }

    if (!form.start_date || !form.end_date) {
      setSnackbar({ open: true, message: "Выберите даты поездки", severity: "error" });
      return;
    }

    if (form.start_date >= form.end_date) {
      setSnackbar({ open: true, message: "Дата окончания должна быть позже даты начала", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const totalPrice = Number(form.travelers_count) * pricePerPerson;

      const res = await fetch(
        "https://student2.softclub.tj/bookings/bookings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            destination_id: destinationId,
            start_date: form.start_date,
            end_date: form.end_date,
            travelers_count: Number(form.travelers_count),
            total_price: totalPrice,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData));
      }

      await res.json();

      setSnackbar({ open: true, message: "Бронь успешно создана!", severity: "success" });

      setTimeout(() => router.push("/my-bookings"), 2000);

    } catch (err: any) {
      console.error(err);
      setSnackbar({ open: true, message: "Не удалось забронировать: " + err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loadingDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading destination...
      </div>
    );
  }

  const imageSrc = destination?.cover_image
    ? `https://student2.softclub.tj${destination.cover_image}`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
        {/* LEFT IMAGE */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group min-h-[400px]">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={destination?.title}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition duration-500"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
            <p className="text-sm opacity-80">{destination?.country}</p>
            <h2 className="text-4xl font-extrabold mb-2">{destination?.title}</h2>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mt-4 flex justify-between">
              <span>Цена за человека</span>
              <span className="font-bold text-lg">${pricePerPerson}</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Забронировать поездку</h3>
          <div className="space-y-4">
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="number"
              name="travelers_count"
              min={1}
              value={form.travelers_count}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <div className="bg-gray-100 p-4 rounded-xl flex justify-between font-bold">
              <span>Итого</span>
              <span>${form.travelers_count * pricePerPerson}</span>
            </div>
            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white bg-yellow-500 hover:bg-yellow-600"
            >
              {loading ? "Сохраняем..." : "Забронировать"}
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
