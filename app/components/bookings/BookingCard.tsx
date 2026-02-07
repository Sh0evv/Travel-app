"use client";

import { Booking } from "@/app/my-bookings/page";
import { Calendar, Users, DollarSign } from "lucide-react";

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

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 p-4 flex flex-col">

      {/* IMAGE */}
      {booking.destination?.cover_image && (
        <img
          src={booking.destination.cover_image}
          alt={booking.destination.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      {/* TITLE + COUNTRY */}
      <div className="mb-3">
        <h3 className="font-semibold text-lg">
          {booking.destination?.title || "Бронирование"}
        </h3>

        {booking.destination?.country && (
          <p className="text-sm text-gray-500">
            {booking.destination.country}
          </p>
        )}

        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
            statusColors[booking.status] || "bg-gray-100"
          }`}
        >
          {booking.status.toUpperCase()}
        </span>
      </div>

      {/* INFO */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          {formatDate(booking.start_date)} -{" "}
          {formatDate(booking.end_date)}
        </div>

        <div className="flex items-center gap-1">
          <Users size={16} />
          {booking.travelers_count}
        </div>
      </div>

      {/* PRICE + CANCEL */}
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-1 font-bold text-lg">
          <DollarSign size={16} />
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
  );
};
