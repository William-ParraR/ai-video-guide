import { useNavigate } from "react-router-dom";
import { learningPath, aiTools } from "../data/aiTools";
import { ArrowLeft, BookOpen, Clock, ChevronRight, Zap, Trophy, Star } from "lucide-react";

const stepColors = [
  "from-emerald-600 to-teal-600",
  "from-blue-600 to-cyan-600",
  "from-violet-600 to-purple-600",
  "from-orange-600 to-amber-600",
  "from-rose-600 to-pink-600",
];

const stepBg = [
  "border-emerald-500/30 bg-emerald-500/5",
  "border-blue-500/30 bg-blue-500/5",
  "border-violet-500/30 bg-violet-500/5",
  "border-orange-500/30 bg-orange-500/5",
  "border-rose-500/30 bg-rose-500/5",
];

export default function LearningPath() {
  const navigate = useNavigate();

  const getToolByName = (name) => aiTools.find((t) => t.name === name || t.name.includes(name.split(" ")[0]));

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border-b border-white/10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-4">
            <Trophy size={14} className="text-violet-400" />
            <span className="text-sm text-violet-300">Guía de Aprendizaje Estructurada</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ruta de <span className="gradient-text">Aprendizaje</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Sigue este camino estructurado desde principiante hasta experto en IAs de edición y generación de video.
            Cada etapa construye sobre la anterior.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Overview */}
        <div className="card-glass p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Resumen del Recorrido</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Etapas", value: "5", icon: BookOpen },
              { label: "Herramientas", value: "14", icon: Zap },
              { label: "Duración estimada", value: "3-6 meses", icon: Clock },
              { label: "Nivel final", value: "Profesional", icon: Trophy },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center bg-white/3 rounded-xl p-4">
                <Icon size={20} className="text-violet-400 mx-auto mb-2" />
                <div className="text-2xl font-black gradient-text">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-violet-500 to-rose-500 opacity-30" />

          <div className="space-y-8">
            {learningPath.map((stage, idx) => (
              <div key={stage.step} className="relative flex gap-6">
                {/* Step indicator */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stepColors[idx]} flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0 z-10`}
                >
                  {stage.step}
                </div>

                {/* Content */}
                <div className={`flex-1 rounded-2xl border p-6 ${stepBg[idx]}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{stage.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-shrink-0">
                      <Clock size={13} className="text-gray-400" />
                      <span className="text-gray-300 text-xs font-medium whitespace-nowrap">{stage.duration}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Habilidades que adquirirás</h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools for this stage */}
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Herramientas de esta etapa</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {stage.tools.map((toolName) => {
                        const tool = getToolByName(toolName);
                        if (!tool) return null;
                        return (
                          <div
                            key={toolName}
                            onClick={() => navigate(`/herramienta/${tool.id}`)}
                            className="flex items-center gap-3 bg-white/3 hover:bg-white/8 border border-white/10 rounded-xl p-3 cursor-pointer transition-all group"
                          >
                            <span className="text-xl">{tool.logo}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-semibold truncate">{tool.name}</p>
                              <div className="flex items-center gap-1">
                                <Star size={9} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-yellow-400 text-xs">{tool.rating}</span>
                              </div>
                            </div>
                            <ChevronRight size={13} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips section */}
        <div className="mt-12 card-glass p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            Consejos Generales para Aprender IAs de Video
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Practica diariamente",
                desc: "15-30 minutos de práctica diaria son más efectivos que sesiones largas esporádicas. La constancia es clave.",
              },
              {
                title: "Construye un portfolio",
                desc: "Guarda todos tus experimentos. Incluso los malos resultados te muestran el progreso y te enseñan qué evitar.",
              },
              {
                title: "Únete a comunidades",
                desc: "Discord, Reddit y YouTube tienen comunidades enormes. Aprenderás trucos que tardarías meses en descubrir solo.",
              },
              {
                title: "Domina el prompt engineering",
                desc: "El 80% de la calidad del resultado depende de cómo escribas el prompt. Estudia los prompts exitosos de otros.",
              },
              {
                title: "Combina herramientas",
                desc: "Los mejores creadores usan múltiples IAs en un solo workflow: genera en Runway, edita en CapCut, subtitula en Descript.",
              },
              {
                title: "Mantente actualizado",
                desc: "Este campo cambia cada semana. Sigue a creadores especializados en YouTube y suscríbete a los blogs oficiales.",
              },
            ].map((tip) => (
              <div key={tip.title} className="bg-white/3 border border-white/8 rounded-xl p-4">
                <h4 className="text-violet-400 font-semibold text-sm mb-1">{tip.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
