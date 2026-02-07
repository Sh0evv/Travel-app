"use client";
import { useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Calendar, Users, DollarSign, Check, AlertCircle } from "lucide-react";

interface Props {
    destinationId: number;
    destinationName?: string;
    destinationImage?: string;
    destinationCountry?: string;
    pricePerPerson?: number;
}

export default function BookingForm({
    destinationId,
    destinationName = "Названия города",
    destinationImage,
    destinationCountry = "Страна",
    pricePerPerson = 100,
}: Props) {
    const router = useRouter();
    const [form, setForm] = useState({
        start_date: "",
        end_date: "",
        travelers_count: 1,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBooking = async () => {
        const token = getToken();
        if (!token) return setError("Сначала войдите в систему");

        if (!form.start_date || !form.end_date) return setError("Выберите даты поездки");
        if (form.start_date >= form.end_date) return setError("Дата окончания должна быть позже даты начала");

        setLoading(true);
        setError("");

        try {
            const totalPrice = Number(form.travelers_count) * pricePerPerson;

            const res = await fetch("https://student2.softclub.tj/bookings/bookings", {
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
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || JSON.stringify(errData));
            }

            await res.json();
            setSuccess(true);
            setTimeout(() => router.push("/my-bookings"), 2000);
        } catch (err: any) {
            console.error(err);
            setError("Не удалось забронировать: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">

                {/* IMAGE */}
                {destinationImage && (
                    <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
                        <img src={destinationImage} alt={destinationName} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* TITLE */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">{destinationName}</h2>
                <p className="text-center text-gray-500 mb-4">{destinationCountry}</p>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 mb-4 text-red-700 bg-red-100 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="flex items-center gap-2 mb-4 text-green-700 bg-green-100 px-4 py-2 rounded-lg">
                        <Check className="w-5 h-5" /> Бронь успешно создана!
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                    {/* Start Date */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-700" />
                        <input
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* End Date */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-700" />
                        <input
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Travelers */}
                    <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-700" />
                        <input
                            type="number"
                            name="travelers_count"
                            min={1}
                            value={form.travelers_count}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl text-gray-800 font-semibold">
                        <span className="flex items-center gap-1">
                            <DollarSign className="w-5 h-5 text-gray-800" /> Итого
                        </span>
                        <span>${form.travelers_count * pricePerPerson}</span>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleBooking}
                        disabled={loading || success}
                        className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Сохраняем..." : success ? "Забронировано!" : "Забронировать"}
                    </button>
                </div>
            </div>
        </div>
    );
}
