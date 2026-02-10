"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Search, Star, Plane } from "lucide-react";

const page = () => {

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  const destinations = [
    { name: "Paris", country: "France", price: "$899", img: "/Paris.avif", flag: "🇫🇷", rating: 4.8 },
    { name: "Tokyo", country: "Japan", price: "$1,299", img: "/tokyo.jpg", flag: "🇯🇵", rating: 4.9 },
    { name: "New York", country: "USA", price: "$749", img: "/newYork1.webp", flag: "🇺🇸", rating: 4.7 },
    { name: "Bali", country: "Indonesia", price: "$999", img: "/bali.jpg", flag: "🇮🇩", rating: 4.9 },
    { name: "Dubai", country: "UAE", price: "$1,099", img: "/dubay.jpg", flag: "🇦🇪", rating: 4.6 },
    { name: "Rome", country: "Italy", price: "$850", img: "/rome.jpg", flag: "🇮🇹", rating: 4.8 },
    { name: "Sydney", country: "Australia", price: "$1,200", img: "/sydney.jpg", flag: "🇦🇺", rating: 4.7 },
    { name: "Cape Town", country: "South Africa", price: "$950", img: "/capeTown.jpg", flag: "🇿🇦", rating: 4.6 },
  ];

  const filters = ["All", "France", "Japan", "USA", "Indonesia", "UAE", "Italy", "Australia", "South Africa"];

  const filteredDestinations = destinations
    .filter((dest) => selectedFilter === "All" || dest.country === selectedFilter)
    .filter((dest) => dest.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="text-white">

      {/* TOP SECTION */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <div className="flex justify-center items-center gap-2 mb-3 text-orange-400 text-sm font-semibold">
            <Plane size={16}/> Explore Tours
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Popular Destinations
          </h2>

          <p className="text-gray-400 mb-10">
            Discover breathtaking locations around the world.
          </p>

          {/* SEARCH FIXED */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search destination..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>

      {/* WHITE SECTION */}
      <div className="bg-white text-black py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((country)=>(
              <button
                key={country}
                onClick={()=>setSelectedFilter(country)}
                className={`px-4 py-2 rounded-full border transition font-medium flex items-center gap-1 ${
                  selectedFilter === country
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                <MapPin size={14}/>
                {country}
              </button>
            ))}
          </div>

          {/* GRID */}
          {filteredDestinations.length === 0 ? (

            <div className="text-center text-gray-500 py-20">
              No destinations found 😢
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {filteredDestinations.map((dest)=>(
                
                <Link
                  key={dest.name}
                  href="/tours"   // ✅ FIXED LINK
                  className="group relative rounded-xl overflow-hidden shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >

                  <div className="overflow-hidden">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 text-white">

                    <p className="text-sm opacity-80 flex items-center gap-1">
                      {dest.flag} {dest.country}
                    </p>

                    <h3 className="font-semibold text-lg">
                      {dest.name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14}/> {dest.rating}
                    </div>

                    <p className="text-yellow-400 font-semibold">
                      From {dest.price}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default page;
