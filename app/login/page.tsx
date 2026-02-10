"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Input from "../components/Input";

import { Lock, Plane, ArrowRight, User, EyeOff, Eye } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { isLoggedIn, setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Для тостов
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("error");

  // Редирект, если уже залогинен
  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn()) {
        router.replace("/");
      }
    };

    checkAuth();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("https://student2.softclub.tj/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Неверное имя пользователя или пароль");
      }

      const data = await res.json();
      setToken(data.access_token);

      // Успешный тост
      setToastMessage("Вы успешно вошли в аккаунт!");
      setToastSeverity("success");
      setToastOpen(true);

      // Редирект через секунду
      setTimeout(() => router.push("/"), 1000);

    } catch (err: any) {
      setError(err.message || "Ошибка при входе");
      setToastMessage(err.message || "Ошибка при входе");
      setToastSeverity("error");
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Форма */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
            {/* Лого */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TravelApp</span>
            </div>

            {/* Заголовок */}
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-6">
              Enter your credentials to access your account
            </p>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="username"
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 h-12 border rounded-md"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 border rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 flex items-center justify-between px-4 group"
                disabled={isLoading}
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{" "}
              <a href="/register" className="text-accent font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Картинка */}
        <div className="hidden lg:flex flex-1 bg-muted items-center justify-center p-12">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
            alt="Travel adventure"
            className="rounded-2xl shadow-2xl mb-8"
          />
        </div>
      </div>

      {/* Тост */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={toastSeverity}
          variant="filled"
          onClose={() => setToastOpen(false)}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
