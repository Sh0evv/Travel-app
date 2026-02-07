"use client";

import { useEffect, useState } from "react";
import { User, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const [profile, setProfile] = useState({ username: "", theme: "light" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("https://student2.softclub.tj/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile({ username: data.username, theme: data.theme || "light" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("https://student2.softclub.tj/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">
              <User size={50} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-gray-500 mt-1">Change your username or theme</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <label className="flex flex-col">
            Username
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>

          <label className="flex flex-col">
            Theme
            <select
              name="theme"
              value={profile.theme}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="light">Light <Sun size={16} className="inline ml-1" /></option>
              <option value="dark">Dark <Moon size={16} className="inline ml-1" /></option>
            </select>
          </label>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white px-6 py-3 rounded-xl mt-4 hover:bg-gray-800 transition shadow-md"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
