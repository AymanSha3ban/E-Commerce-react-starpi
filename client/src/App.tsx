import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./Store/authStore";
import { useCartState } from "./Store/CartStore";
import { getMe } from "./api/auth/auth";
import { useQuery } from "@tanstack/react-query";

function App() {
  const user = useAuthStore((state) => state.user);
  const switchUser = useCartState((state) => state.switchUser);
  const activeCartId = useCartState((state) => state.activeCartId);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const { data, error } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
    }
  }, [error, logout]);
  
  useEffect(() => {
    const expectedCartId = user?.documentId || "guest";
    if (activeCartId !== expectedCartId) {
      switchUser(user?.documentId || null);
    }
  }, [user?.documentId, activeCartId, switchUser]);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background text-foreground">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] px-3 py-4 md:px-6 md:py-6">
        <Outlet />
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;