import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star, ExternalLink, ChevronUp, ChevronDown, Info } from "lucide-react";
import { aiTools, categories, difficultyLevels } from "../data/aiTools";
import ToolLogo from "./ToolLogo";

const tierColors = {
  freemium: "tier-badge-freemium",
  free: "tier-badge-free",
  paid: "tier-badge-paid",
};

const tierLabels = {
  freemium: "Freemium",
  free: "Gratis",
  paid: "De Pago",
};

const accentMap = {
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  red: "text-red-400 bg-red-500/10 border-red-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

export default function ComparisonTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  const [sortBy, setSortBy] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");
  const [hoveredRow, setHoveredRow] = useState(null);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  const filtered = aiTools
    .filter((tool) => {
      const matchSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "Todos" || tool.category === selectedCategory;
      const matchDifficulty = selectedDifficulty === "Todos" || tool.difficulty === selectedDifficulty;
      return matchSearch && matchCategory && matchDifficulty;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <ChevronUp size={12} className="opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="text-violet-400" />
    ) : (
      <ChevronDown size={12} className="text-violet-400" />
    );
  };

  return (
    <section id="tabla" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-4">
            <Filter size={14} className="text-violet-400" />
            <span className="text-sm text-violet-300">Comparativa Completa</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Tabla Comparativa de{" "}
            <span className="gradient-text">IAs de Video</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Compara las 14 mejores herramientas de IA para edición y generación de video.
            Haz clic en cualquier fila para ver todos los detalles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm min-w-[180px]"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-gray-900">
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm min-w-[150px]"
          >
            {difficultyLevels.map((d) => (
              <option key={d} value={d} className="bg-gray-900">
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-400">
            Mostrando{" "}
            <span className="text-violet-400 font-semibold">{filtered.length}</span> de{" "}
            <span className="text-white font-semibold">{aiTools.length}</span> herramientas
          </span>
          <Info size={14} className="text-gray-600" />
          <span className="text-xs text-gray-600">Haz clic en una fila para ver detalles completos</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-4 text-left text-gray-400 font-semibold">Herramienta</th>
                <th
                  className="px-4 py-4 text-left text-gray-400 font-semibold cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort("category")}
                >
                  <span className="flex items-center gap-1">
                    Categoría <SortIcon field="category" />
                  </span>
                </th>
                <th className="px-4 py-4 text-left text-gray-400 font-semibold">Plan Gratuito</th>
                <th
                  className="px-4 py-4 text-left text-gray-400 font-semibold cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort("difficulty")}
                >
                  <span className="flex items-center gap-1">
                    Nivel <SortIcon field="difficulty" />
                  </span>
                </th>
                <th
                  className="px-4 py-4 text-left text-gray-400 font-semibold cursor-pointer hover:text-white transition-colors"
                  onClick={() => toggleSort("rating")}
                >
                  <span className="flex items-center gap-1">
                    Rating <SortIcon field="rating" />
                  </span>
                </th>
                <th className="px-4 py-4 text-left text-gray-400 font-semibold">Usuarios</th>
                <th className="px-4 py-4 text-left text-gray-400 font-semibold">Tier</th>
                <th className="px-4 py-4 text-left text-gray-400 font-semibold">Acceso</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tool, idx) => (
                <tr
                  key={tool.id}
                  className={`border-b border-white/5 cursor-pointer transition-all duration-200 ${
                    hoveredRow === tool.id ? "bg-violet-500/10" : idx % 2 === 0 ? "bg-white/2" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(tool.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => navigate(`/herramienta/${tool.id}`)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <ToolLogo tool={tool} sizeClass="w-10 h-10" textSize="text-xl" />
                      <div>
                        <div className="font-semibold text-white">{tool.name}</div>
                        <div className="text-xs text-gray-500 max-w-[200px] truncate">{tool.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-lg border font-medium ${
                        accentMap[tool.accentColor] || "text-gray-400 bg-gray-500/10 border-gray-500/20"
                      }`}
                    >
                      {tool.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-300 text-xs max-w-[160px] block leading-tight">{tool.freeLimit}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        tool.difficulty === "Principiante"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : tool.difficulty === "Intermedio"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {tool.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-white">{tool.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-300 text-xs font-medium">{tool.users}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={tierColors[tool.tierType]}>
                      {tierLabels[tool.tierType]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors text-xs font-medium"
                    >
                      Visitar <ExternalLink size={10} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-white" />
              </div>
              <p className="text-gray-400">No se encontraron herramientas con esos filtros</p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("Todos"); setSelectedDifficulty("Todos"); }}
                className="mt-4 text-violet-400 hover:text-violet-300 text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
