import { useParams, useNavigate } from "react-router-dom";
import { aiTools } from "../data/aiTools";
import {
  ArrowLeft, Star, ExternalLink, Check, X, Lightbulb, BookOpen,
  Zap, Users, Target, BarChart3, DollarSign, Info, ChevronRight
} from "lucide-react";

const difficultyConfig = {
  Principiante: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Intermedio: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  Avanzado: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const resourceTypeColors = {
  Oficial: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  YouTube: "bg-red-500/15 text-red-400 border-red-500/30",
  Comunidad: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Documentación: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Blog: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = aiTools.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Herramienta no encontrada</h2>
          <button onClick={() => navigate("/")} className="btn-primary mt-4">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const diff = difficultyConfig[tool.difficulty] || difficultyConfig.Intermedio;
  const otherTools = aiTools.filter((t) => t.id !== tool.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      {/* Hero Banner */}
      <div className={`relative bg-gradient-to-r ${tool.color} py-16 px-4 overflow-hidden`}>
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-5xl shadow-2xl`}
            >
              {tool.logo}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className={`text-xs px-2 py-1 rounded-lg border ${diff.color} ${diff.bg}`}>
                  {tool.difficulty}
                </span>
                <span className="bg-white/10 border border-white/20 text-white/80 text-xs px-2 py-1 rounded-lg">
                  {tool.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">{tool.name}</h1>
              <p className="text-white/80 text-xl mb-3">{tool.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold text-lg">{tool.rating}</span>
                  <span className="text-white/50 text-sm">/5.0</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Users size={14} />
                  {tool.users} usuarios
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-xl transition-all"
                >
                  Visitar {tool.name} <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (main) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Info size={18} className="text-violet-400" />
                ¿Qué es {tool.name}?
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">{tool.description}</p>
            </section>

            {/* Specializations */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-violet-400" />
                Especialidades y Capacidades
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.specializations.map((spec) => (
                  <div key={spec} className="flex items-start gap-2.5 bg-violet-500/5 border border-violet-500/15 rounded-xl p-3">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-violet-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-violet-400" />
                ¿Cómo Funciona? (Técnico)
              </h2>
              <div className="space-y-4">
                {tool.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-violet-400" />
                Ventajas y Desventajas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-3 flex items-center gap-1.5">
                    <Check size={14} /> Ventajas
                  </h3>
                  <ul className="space-y-2">
                    {tool.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-1.5">
                    <X size={14} /> Desventajas
                  </h3>
                  <ul className="space-y-2">
                    {tool.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">−</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-violet-400" />
                Casos de Uso Principales
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.useCases.map((uc, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-gray-300 text-sm">{uc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pro Tips */}
            <section className="card-glass p-6 border-yellow-500/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-400" />
                Consejos Pro para Dominar {tool.name}
              </h2>
              <div className="space-y-3">
                {tool.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4">
                    <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb size={12} className="text-yellow-400" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Resources */}
            <section className="card-glass p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-violet-400" />
                Recursos de Aprendizaje
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.learningResources.map((res) => (
                  <a
                    key={res.name}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/3 hover:bg-white/8 border border-white/10 hover:border-violet-500/30 rounded-xl p-4 transition-all group"
                  >
                    <div className="flex-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${resourceTypeColors[res.type] || "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                        {res.type}
                      </span>
                      <p className="text-white font-medium text-sm mt-1">{res.name}</p>
                    </div>
                    <ExternalLink size={14} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (sidebar) */}
          <div className="space-y-6">
            {/* CTA */}
            <div className={`card-glass p-6 bg-gradient-to-br ${tool.color} bg-opacity-10 border-opacity-30`}>
              <h3 className="text-lg font-bold text-white mb-3">Empezar Ahora</h3>
              <p className="text-gray-300 text-sm mb-4">Accede a {tool.name} directamente y comienza a crear</p>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Abrir {tool.name} <ExternalLink size={14} />
              </a>
            </div>

            {/* Free Tier Details */}
            <div className="card-glass p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={16} className="text-emerald-400" />
                Plan Gratuito — Detalles
              </h3>
              <div className="space-y-3">
                {Object.entries(tool.freeTier).map(([key, value]) => {
                  const labels = {
                    credits: "Créditos",
                    videoLength: "Duración video",
                    resolution: "Resolución",
                    watermark: "Marca de agua",
                    storage: "Almacenamiento",
                    features: "Funciones incluidas",
                  };
                  if (key === "features") {
                    return (
                      <div key={key}>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">{labels[key]}</span>
                        <ul className="space-y-1">
                          {value.map((f) => (
                            <li key={f} className="flex items-start gap-1.5 text-xs text-gray-300">
                              <Check size={10} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="flex items-start justify-between gap-2">
                      <span className="text-gray-500 text-xs uppercase tracking-wider flex-shrink-0">{labels[key]}</span>
                      <span className="text-gray-200 text-xs text-right">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing */}
            <div className="card-glass p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign size={16} className="text-violet-400" />
                Precios
              </h3>
              <div className="space-y-3">
                {tool.pricing.map((plan) => (
                  <div
                    key={plan.plan}
                    className={`rounded-xl p-3 border ${
                      plan.plan === "Free"
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-white/10 bg-white/3"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white text-sm">{plan.plan}</span>
                      <span className={`font-bold text-sm ${plan.plan === "Free" ? "text-emerald-400" : "text-violet-400"}`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{plan.credits}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Rating */}
            <div className="card-glass p-6">
              <h3 className="text-lg font-bold text-white mb-4">Puntuación</h3>
              <div className="space-y-3">
                {[
                  { label: "Calidad de IA", value: Math.min(5, tool.rating) },
                  { label: "Facilidad de uso", value: tool.difficulty === "Principiante" ? 4.8 : tool.difficulty === "Intermedio" ? 3.5 : 2.5 },
                  { label: "Valor gratuito", value: tool.tierType === "free" ? 5 : tool.tierType === "freemium" ? 3.5 : 2 },
                  { label: "Relación calidad/precio", value: tool.rating - 0.3 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-semibold">{item.value.toFixed(1)}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${tool.color} rounded-full`}
                        style={{ width: `${(item.value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Otras Herramientas que te pueden interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherTools.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate(`/herramienta/${t.id}`)}
                className="card-glass p-4 cursor-pointer hover:bg-white/8 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{t.logo}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-xs">{t.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2">{t.tagline}</p>
                <div className="flex items-center gap-1 mt-2 text-violet-400 text-xs group-hover:text-violet-300">
                  Ver detalles <ChevronRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
