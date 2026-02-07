"use client";



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

import Link from "next/link";
import { ArrowRight, Calendar, Globe, Heart, Shield, Star, Users } from "lucide-react";



export default function HomePage() {
    const router = useRouter();
    const [bgIndex, setBgIndex] = useState(0);


    interface Destination {
        id: number;
        title: string;
        country: string;
        cover_image: string;
        rating: number;
    }

    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        fetch("https://student2.softclub.tj/destinations/destinations", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDestinations(data.slice(0, 5));
                }
            })
            .catch(err => console.error(err));
    }, []);




    const backgrounds = [
        { type: "video", src: "/videos/vidgap_7506480973706530070_hd.mp4" }, // видео в public/videos

    ];

    return (
        <div>
            <div className="relative w-full min-h-screen overflow-hidden">
                {/* Фон */}
                {backgrounds.map((bg, index) => {
                    const isActive = index === bgIndex;
                    if (bg.type === "video") {
                        return (
                            <video
                                key={index}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={bg.src} type="video/mp4" />
                            </video>
                        );
                    } else {
                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{ backgroundImage: `url('${bg.src}')` }}
                            ></div>
                        );
                    }
                })}

                {/* Затемнение */}
                <div className="absolute inset-0 bg-black/50 transition-opacity duration-1000"></div>

                {/* Контент по центру */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <h1 className="mb-10 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Explore the World <span className="text-yellow-500">with Travel App</span>
                    </h1>


                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/destinations"
                            className="px-6 py-3 rounded-lg bg-yellow-500 text-black font-medium hover:bg-yellow-600 transition"
                        >
                            Start Your Journey →
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center py-[010px]">
                <div className="flex flex-col sm:flex-row justify-between gap-8 p-6 bg-white ">
                    <div className="py-23">
                        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-stretch gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-start gap-4 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-80">
                                <div className="p-4 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-xl">500+ Destinations</h3>
                                <p className="text-gray-500 text-sm">Explore unique places around the world</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-start gap-4 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-80">
                                <div className="p-4 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-xl">Best Price Guarantee</h3>
                                <p className="text-gray-500 text-sm">We match any competitor's price</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-start gap-4 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-80">
                                <div className="p-4 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-xl">24/7 Support</h3>
                                <p className="text-gray-500 text-sm">We're here whenever you need us</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="py-1 ">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
                    <p className="text-gray-500 mb-12">
                        Discover our most loved travel destinations, handpicked for unforgettable experiences.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* Destination Card */}
                        <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img src="/Paris.avif" alt="Paris" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-80 flex items-center gap-1">🇫🇷 France</p>
                                <h3 className="font-semibold text-lg">Paris</h3>
                                <p className="text-yellow-400 font-semibold">From $899</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img src="/tokyo.jpg" alt="Tokyo" className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-80 flex items-center gap-1">🇯🇵 Japan</p>
                                <h3 className="font-semibold text-lg">Tokyo</h3>
                                <p className="text-yellow-400 font-semibold">From $1,299</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="/newYork1.webp"
                                alt="New York"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-80 flex items-center gap-1">🇺🇸 USA</p>
                                <h3 className="font-semibold text-lg">New York</h3>
                                <p className="text-yellow-400 font-semibold">From $749</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="/bali.jpg"
                                alt="Bali"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-80 flex items-center gap-1">🇮🇩 Indonesia</p>
                                <h3 className="font-semibold text-lg">Bali</h3>
                                <p className="text-yellow-400 font-semibold">From $999</p>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="/dubay.jpg"
                                alt="Dubai"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-80 flex items-center gap-1">🇦🇪 UAE</p>
                                <h3 className="font-semibold text-lg">Dubai</h3>
                                <p className="text-yellow-400 font-semibold">From $1,099</p>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <Link
                        href="/destinations"
                        className="mt-52 px-6 py-3 rounded-full border border-gray-300 text-gray-900 hover:bg-gray-100 transition"
                    >
                        View All Destinations →
                    </Link>
                </div>
            </div>

            <div className="bg-gray-50 py-20 px-4">
                {/* Header */}
                <div className="text-center mb-12 px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Recommended Tours
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Handpicked tours for unforgettable adventures around the world.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {destinations.map((dest) => (
                        <div
                            key={dest.id}
                            className="relative rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={dest.cover_image}
                                    alt={dest.title}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient overlay (только для текста) */}
                                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            {/* Text content */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-90 flex items-center gap-1 mb-1 transition-all group-hover:text-indigo-300">
                                    <Globe size={14} /> {dest.country}
                                </p>
                                <h3 className="font-bold text-lg group-hover:text-xl transition-all duration-300">
                                    {dest.title}
                                </h3>
                                <p className="flex items-center gap-1 text-yellow-400 font-semibold mt-1 group-hover:text-yellow-300">
                                    <Star size={14} /> {dest.rating.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-12">
                    <Link href="/tours">
                        <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                            Explore All Tours <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>




            <div className="flex flex-col items-center justify-center py-[120px]   mt-[30px] bg-[#171717] text-center px-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                    Ready to Start Your Adventure?
                </h1>
                <p className="text-gray-300 text-lg sm:text-xl mb-6 max-w-xl">
                    Join thousands of travelers who trust TravelApp for their journeys around the world.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-700 active:bg-yellow-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300">
                    Create Free Account
                </button>
            </div>

        </div>
    );
}
