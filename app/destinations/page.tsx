"use client"; // <- add this at the top

import React, { useState } from "react";
import { MapPin } from "lucide-react";

const page = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const destinations = [
    { name: "Paris", country: "France", price: "$899", img: "/Paris.avif", flag: "🇫🇷" },
    { name: "Tokyo", country: "Japan", price: "$1,299", img: "/tokyo.jpg", flag: "🇯🇵" },
    { name: "New York", country: "USA", price: "$749", img: "/newYork1.webp", flag: "🇺🇸" },
    { name: "Bali", country: "Indonesia", price: "$999", img: "/bali.jpg", flag: "🇮🇩" },
    { name: "Dubai", country: "UAE", price: "$1,099", img: "/dubay.jpg", flag: "🇦🇪" },
    { name: "Rome", country: "Italy", price: "$850", img: "/rome.jpg", flag: "🇮🇹" },
    { name: "Sydney", country: "Australia", price: "$1,200", img: "/sydney.jpg", flag: "🇦🇺" },
    { name: "Cape Town", country: "South Africa", price: "$950", img: "/capeTown.jpg", flag: "🇿🇦" },
  ];

  const filters = ["All", "France", "Japan", "USA", "Indonesia", "UAE", "Italy", "Australia", "South Africa"];

  return (
    <div className="text-white">
      {/* Top black section */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-3 text-orange-400 text-sm font-semibold">
            <MapPin size={16} /> Explore
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Popular Destinations</h2>
          <p className="text-gray-400 mb-8 sm:mb-12">
            Discover breathtaking locations around the world. From bustling cities to serene beaches.
          </p>
        </div>
      </div>

      {/* White section with filters and cards */}
      <div className="bg-white text-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-8 gap-2">
            {/* Country filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedFilter(country)}
                  className={`px-4 py-2 rounded-full border transition font-medium ${
                    selectedFilter === country
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <select className="px-4 py-2 rounded-full border border-gray-300 bg-white text-black font-medium">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Destination cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations
              .filter((dest) => selectedFilter === "All" || dest.country === selectedFilter)
              .map((dest) => (
                <div
                  key={dest.name}
                  className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img src={dest.img} alt={dest.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-80 flex items-center gap-1">
                      {dest.flag} {dest.country}
                    </p>
                    <h3 className="font-semibold text-lg">{dest.name}</h3>
                    <p className="text-yellow-400 font-semibold">From {dest.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
