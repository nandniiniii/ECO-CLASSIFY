import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ClassifyPage from "./pages/ClassifyPage.jsx";
import ImpactPage from "./pages/ImpactPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-white/30">
        <span>2026 Eco-Classify. Built by Nandni.</span>
        <div className="flex gap-4">
          <a href="https://github.com/nandniiniii/ECO-CLASSIFY" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
          <a href="https://eco-classify-backend.onrender.com/health" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">API</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ClassifyPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}