import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ClassifyPage from "./pages/ClassifyPage.jsx";
import ImpactPage from "./pages/ImpactPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<ClassifyPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </div>
  );
}
