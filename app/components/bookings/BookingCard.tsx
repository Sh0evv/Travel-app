"use client";

import { Booking } from "@/app/my-bookings/page";
import { Calendar, Users, DollarSign, Star } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: number) => void;
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export const BookingCard = ({
  booking,
  onCancel,
  isLoading,
}: BookingCardProps) => {

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // duration (без изменения логики)
  const getDuration = () => {
    const start = new Date(booking.start_date).getTime();
    const end = new Date(booking.end_date).getTime();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} дней` : "";
  };

  // countdown
  const getCountdown = () => {
    const now = new Date().getTime();
    const start = new Date(booking.start_date).getTime();
    const diff = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `До поездки ${diff} дней`;
    return "";
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 flex flex-col transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      {booking.destination?.cover_image && (
        <div className="relative">
          <img
            src={booking.destination.cover_image}
            alt={booking.destination.title}
            className="w-full h-48 object-cover"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* title over image */}
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-semibold text-lg">
              {booking.destination?.title || "Бронирование"}
            </h3>

            {booking.destination?.country && (
              <p className="text-sm opacity-90">
                {booking.destination.country}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">

        {/* STATUS */}
        <span
          className={`inline-block w-fit mb-3 px-2 py-1 text-xs rounded border ${
            statusColors[booking.status] || "bg-gray-100"
          }`}
        >
          {booking.status.toUpperCase()}
        </span>

        {/* INFO */}
        <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(booking.start_date)} -{" "}
            {formatDate(booking.end_date)}
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            {booking.travelers_count}
          </div>

          {/* duration */}
          <div className="text-xs text-gray-400">
            {getDuration()}
          </div>

          {/* countdown */}
          <div className="text-xs text-indigo-500 font-medium">
            {getCountdown()}
          </div>

        </div>

        {/* PRICE + CANCEL */}
        <div className="flex justify-between items-center mt-auto">

          <div className="flex items-center gap-1 font-bold text-xl text-indigo-600">
            <DollarSign size={18} />
            {booking.total_price.toFixed(2)}
          </div>

          {booking.status === "pending" && onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
            >
              {isLoading ? "Отмена..." : "Отменить"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
