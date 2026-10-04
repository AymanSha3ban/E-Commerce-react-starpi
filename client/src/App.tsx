import { Outlet } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background text-foreground">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] px-3 py-4 md:px-6 md:py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;