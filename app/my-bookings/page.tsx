"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { bookingsApi } from "@/lib/bookingsApi";
import { Calendar, Users, MapPin, DollarSign, X } from "lucide-react";

export interface Booking {
  id: number;
  user_id: number;
  destination_id: number;
  start_date: string;
  end_date: string;
  travelers_count: number;
  total_price: number;
  status: string;
  created_at: string;
  destination?: {
    title: string;
    country: string;
    cover_image: string;
  };
}

// ==== Премиум карточка бронирования ====
interface BookingCardProps {
  booking: Booking;
  onCancel: (id: number) => void;
  isLoading: boolean;
}

function BookingCard({ booking, onCancel, isLoading }: BookingCardProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      {/* IMAGE + GRADIENT */}
      <div className="relative h-56 w-full">
        <img
          src={booking.destination?.cover_image || "/placeholder.jpg"}
          alt={booking.destination?.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* STATUS */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg ${booking.status === "confirmed" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {booking.status}
        </span>

        {/* CANCEL BUTTON ON IMAGE */}
        <button
          onClick={() => onCancel(booking.id)}
          disabled={isLoading}
          className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transition"
        >
          <X className="w-4 h-4" />
          {isLoading ? "Отмена..." : "Отменить"}
        </button>
      </div>

      {/* INFO */}
      <div className="p-5 bg-white flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">{booking.destination?.title}</h2>

        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          {booking.destination?.country}
        </p>

        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          {booking.start_date} - {booking.end_date}
        </p>

        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          {booking.travelers_count} traveler{booking.travelers_count > 1 ? "s" : ""}
        </p>

        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-gray-400" /> ${booking.total_price}
        </p>
      </div>
    </div>
  );
}

// ==== Главная страница ====
export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  // Загрузка бронирований
  useEffect(() => {
    const fetchBookings = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://student2.softclub.tj/bookings/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Ошибка загрузки бронирований:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  const handleCancel = async (bookingId: number) => {
    setCancellingId(bookingId);
    try {
      await bookingsApi.cancelBooking(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      alert("Бронирование успешно отменено ✅");
    } catch (error: any) {
      alert(`Не удалось отменить бронь: ${error.message}`);
      console.error("Ошибка отмены брони:", error);
    } finally {
      setCancellingId(null);
    }
  };


  if (loading)
    return (
      <p className="text-center py-28 text-gray-500 text-xl animate-pulse">
        Загрузка бронирований...
      </p>
    );

  if (bookings.length === 0)
    return (
      <p className="text-center py-28 text-gray-400 text-xl">
        У вас пока нет бронирований
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">
          Мои бронирования
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Все ваши запланированные путешествия в одном месте ✈️
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
              isLoading={cancellingId === booking.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
