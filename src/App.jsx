import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ToolDetail from "./pages/ToolDetail";
import LearningPath from "./pages/LearningPath";
import Mentoria from "./pages/Mentoria";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/herramienta/:id" element={<ToolDetail />} />
        <Route path="/ruta-aprendizaje" element={<LearningPath />} />
        <Route path="/mentoria" element={<Mentoria />} />
      </Routes>
    </HashRouter>
  );
}
