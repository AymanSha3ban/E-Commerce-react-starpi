import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Navbar />

      <Box
        as="main"
        minH="calc(100vh - 200px)"
        px={{ base: 3, md: 6 }}
        py={{ base: 4, md: 6 }}
      >
        <Outlet />
      </Box>

      <Footer />
    </div>
  );
}

export default App;