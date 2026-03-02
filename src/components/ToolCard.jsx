import { useNavigate } from "react-router-dom";
import { Star, ExternalLink, ArrowRight, Users, Zap } from "lucide-react";

const difficultyConfig = {
  Principiante: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Intermedio: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  Avanzado: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const tierConfig = {
  freemium: { label: "Freemium", className: "tier-badge-freemium" },
  free: { label: "Gratis", className: "tier-badge-free" },
  paid: { label: "De Pago", className: "tier-badge-paid" },
};

export default function ToolCard({ tool, delay = 0 }) {
  const navigate = useNavigate();
  const diff = difficultyConfig[tool.difficulty] || difficultyConfig.Intermedio;
  const tier = tierConfig[tool.tierType] || tierConfig.freemium;

  return (
    <div
      className="card-glass hover:bg-white/8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/herramienta/${tool.id}`)}
    >
      {/* Card Header */}
      <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${tool.color}`} />

      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-lg`}>
              {tool.logo}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">{tool.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold">{tool.rating}</span>
                <span className="text-gray-600 text-xs">·</span>
                <span className="text-gray-500 text-xs">{tool.users}</span>
              </div>
            </div>
          </div>
          <span className={tier.className}>{tier.label}</span>
        </div>

        {/* Tagline */}
        <p className="text-violet-300 text-sm font-medium mb-2">{tool.tagline}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Category + Difficulty */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-2 py-1 rounded-lg">
            {tool.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-lg border ${diff.color} ${diff.bg}`}>
            {tool.difficulty}
          </span>
        </div>

        {/* Free limit highlight */}
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={12} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Plan Gratuito</span>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">{tool.freeLimit}</p>
        </div>

        {/* Top specializations */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Users size={12} className="text-gray-500" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">Especialidades</span>
          </div>
          <ul className="space-y-1">
            {tool.specializations.slice(0, 3).map((spec) => (
              <li key={spec} className="text-xs text-gray-400 flex items-start gap-1.5">
                <span className="text-violet-500 mt-0.5">›</span>
                {spec}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-gray-500 hover:text-violet-400 flex items-center gap-1 transition-colors"
          >
            Ir a la herramienta <ExternalLink size={10} />
          </a>
          <button className="flex items-center gap-1.5 text-xs text-violet-400 font-semibold group-hover:text-violet-300 transition-colors">
            Ver detalles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
