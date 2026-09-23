import { Outlet } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-background text-foreground">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] px-3 md:px-6 py-4 md:py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;