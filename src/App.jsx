import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ToolDetail from "./pages/ToolDetail";
import LearningPath from "./pages/LearningPath";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/herramienta/:id" element={<ToolDetail />} />
        <Route path="/ruta-aprendizaje" element={<LearningPath />} />
      </Routes>
    </BrowserRouter>
  );
}
