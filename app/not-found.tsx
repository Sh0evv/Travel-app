"use client";

import Link from "next/link";
import { Plane } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Самолёт летает */}
      <Plane className="w-16 h-16 text-primary animate-bounce mb-6" />

      <h1 className="text-6xl font-extrabold text-black mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Упс… такой страницы нет!</h2>
      <p className="text-gray-500 mb-6">
        Похоже, вы попали не туда. Не переживайте — всё ещё можно вернуться на главную.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
      >
        На главную
        <Plane className="w-4 h-4 rotate-45" />
      </Link>

      {/* Немного юмора */}
      <p className="mt-6 text-gray-400 italic text-sm">
        Даже самолёты иногда теряются ✈️
      </p>
    </div>
  );
}
