"use client";

import { useEffect, useState } from "react";
import { BookingCard } from "../components/bookings/BookingCard";
import { getToken } from "@/lib/auth";
import { bookingsApi } from "@/lib/bookingsApi"; // <- import at the top

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

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  // === Загрузка бронирований пользователя ===
  useEffect(() => {
    const fetchBookings = async () => {
      const token = getToken();
      if (!token) {
        console.log("Нет токена, войдите в систему");
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

  // === Отмена бронирования ===
  const handleCancel = async (bookingId: number) => {
    setCancellingId(bookingId);

    try {
      await bookingsApi.cancelBooking(bookingId);

      // Убираем отменённое бронирование из списка
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (error) {
      console.error("Ошибка отмены брони:", error);
      alert("Не удалось отменить бронь");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500">Загрузка бронирований...</p>
    );

  if (bookings.length === 0)
    return (
      <p className="text-center py-20 text-gray-400">
        У вас пока нет бронирований
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Мои бронирования
        </h1>
        <p className="text-gray-500 mt-2">
          Все ваши запланированные путешествия в одном месте ✈️
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <BookingCard
                booking={booking}
                onCancel={handleCancel}
                isLoading={cancellingId === booking.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
