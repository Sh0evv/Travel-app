"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Input from "../components/Input";
import { Lock, User, Plane, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  // редирект если уже залогинен
  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // базовая валидация
    if (!formData.username || !formData.password || !formData.confirm_password) {
      setError("Please fill in all fields");
      setToastOpen(true);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setToastOpen(true);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setToastOpen(true);
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms & Privacy Policy");
      setToastOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://student2.softclub.tj/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      // ✅ успешно — редирект на login
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 py-[20px]">
        {/* Left Image */}
        <div className="hidden lg:flex flex-1 bg-muted items-center justify-center p-12">
          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop"
            alt="Travel destination"
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TravelApp</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground mb-6">
              Join TravelApp and start exploring the world
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 h-12 border rounded-md"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-12 border rounded-md"
                  minLength={8}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="pl-10 h-12 border rounded-md"
                  minLength={8}
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={e => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 mt-1 rounded border cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{" "}
                  <a href="/privacy" className="text-accent">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Social */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
                <FcGoogle /> Google
              </Button>
              <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
                <FaGithub /> GitHub
              </Button>
            </div>

            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-accent font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
