"use client";

import { useEffect, useState } from "react";
import { User, Mail, MapPin, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("https://student2.softclub.tj/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!profile) return <div className="p-10 text-center text-gray-500">No profile data</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          {/* Аватар */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">
                <User size={50} />
              </div>
            </div>
          </div>

          {/* Имя и описание */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
            <p className="text-gray-500 mt-1">Traveler & Explorer</p>
          </div>

          {/* Кнопка редактирования */}
          <button
            className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition shadow-sm"
            onClick={() => router.push(`/editProfile/${profile.id}`)}
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        {/* Информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={<Mail size={20} />} title="Email" value={`${profile.username}@gmail.com`} />
          <InfoCard icon={<MapPin size={20} />} title="Location" value="Tajikistan" />
          <InfoCard icon={<User size={20} />} title="Theme" value={profile.theme || "Default"} />
          <InfoCard icon={<User size={20} />} title="Member Since" value={profile.created_at?.split("T")[0] || "—"} />
        </div>
      </div>
    </div>
  );
}

// Карточка с информацией
function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
