import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ComparisonTable from "../components/ComparisonTable";
import ToolCard from "../components/ToolCard";
import { aiTools } from "../data/aiTools";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Zap, Star, TrendingUp, Play, ArrowRight, Film, Scissors, Wind, Brain, FileText, RefreshCw, Globe, Rocket, Users } from "lucide-react";

const topRated = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 6);
const forBeginners = aiTools.filter((t) => t.difficulty === "Principiante").slice(0, 3);

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div>
      <HeroSection />

      {/* Stats bar */}
      <div className="bg-white/3 border-y border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Film, label: "Runway ML", sub: "Mejor calidad general" },
              { icon: Zap, label: "Pika Labs", sub: "Mejor para principiantes" },
              { icon: Wind, label: "Kling AI", sub: "Mejor plan gratuito" },
              { icon: Scissors, label: "CapCut AI", sub: "Más usuarios activos" },
              { icon: TrendingUp, label: "Sora", sub: "Mayor calidad cinematic" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-center sm:text-left">
                <item.icon size={24} className="text-violet-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Top Rated */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-4">
                <Star size={14} className="text-yellow-400" />
                <span className="text-sm text-yellow-300">Las Mejor Valoradas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Top 6 IAs de Video <span className="gradient-text">2025</span>
              </h2>
              <p className="text-gray-400 mt-2">Las herramientas con mejor puntuación según nuestra evaluación</p>
            </div>
            <button
              onClick={() => document.getElementById("tabla").scrollIntoView({ behavior: "smooth" })}
              className="hidden sm:flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium"
            >
              Ver todas <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {topRated.map((tool, idx) => (
              <ToolCard key={tool.id} tool={tool} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* For Beginners */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
              <Zap size={14} className="text-emerald-400" />
              <span className="text-sm text-emerald-300">Para Principiantes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              ¿Nuevo en las IAs de Video?{" "}
              <span className="gradient-text">Empieza aquí</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Estas herramientas son perfectas si estás comenzando tu viaje en la edición e IA de video
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {forBeginners.map((tool, idx) => (
              <ToolCard key={tool.id} tool={tool} delay={idx * 150} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/ruta-aprendizaje")}
              className="btn-primary inline-flex items-center gap-2 text-base py-3 px-8"
            >
              <BookOpen size={18} />
              Ver Ruta de Aprendizaje Completa
            </button>
          </div>
        </div>
      </section>

      {/* How AI Video works - Educational section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
              <TrendingUp size={14} className="text-blue-400" />
              <span className="text-sm text-blue-300">Entender la IA de Video</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Cómo funcionan las{" "}
              <span className="gradient-text">IAs de Video?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Una introducción conceptual para entender la tecnología detrás de estas herramientas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Brain,
                title: "Modelos de Difusión",
                desc: "La mayoría de las IAs de video usan modelos de difusión: agregan ruido aleatorio a videos reales durante el entrenamiento y aprenden a revertir ese proceso. En la inferencia, parten de ruido puro y 'quitan' ruido guiados por tu prompt hasta generar un video coherente.",
              },
              {
                icon: FileText,
                title: "Prompt Engineering",
                desc: "El 'prompt' es la instrucción en texto que le das a la IA. Dominar el arte de escribir prompts efectivos es la habilidad más importante para obtener buenos resultados. Incluir estilo, movimiento de cámara, iluminación y detalles técnicos marca una diferencia enorme.",
              },
              {
                icon: Zap,
                title: "Créditos y Tokens",
                desc: "Las plataformas usan sistemas de créditos porque generar video consume muchos recursos computacionales (GPU). Cada segundo de video puede costar 1-10 créditos según la calidad. Los planes gratuitos dan una cantidad limitada mensual o diariamente.",
              },
              {
                icon: Film,
                title: "Texto a Video vs Imagen a Video",
                desc: "Las IAs modernas soportan dos modos principales: Texto a Video (solo describes con palabras lo que quieres) e Imagen a Video (das una foto de inicio y la IA la anima). Imagen a Video da resultados más predecibles y es más fácil de controlar para principiantes.",
              },
              {
                icon: RefreshCw,
                title: "Coherencia Temporal",
                desc: "El mayor reto técnico en generación de video es mantener coherencia entre fotogramas: que los personajes, objetos y fondos sean consistentes durante toda la secuencia. Los modelos más avanzados (Sora, Gen-3) son excelentes en esto; los básicos pueden tener 'glitches'.",
              },
              {
                icon: Globe,
                title: "Modelos Especializados vs Generales",
                desc: "Algunas IAs son generalistas (generan cualquier tipo de video) como Runway o Pika, mientras otras están especializadas: HeyGen en avatares, Descript en transcripción, Synthesia en contenido corporativo. Cada especialista supera a los generalistas en su nicho.",
              },
            ].map((item) => (
              <div key={item.title} className="card-glass p-6 hover:bg-white/8 transition-all">
                <item.icon size={28} className="text-violet-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoria CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass p-10 text-center border border-violet-500/20">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Mentoría <span className="gradient-text">Personalizada</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Aprende a dominar las IAs de video con guía personalizada. Sesiones adaptadas a tu nivel y objetivos.
            </p>
            <button
              onClick={() => navigate("/mentoria")}
              className="btn-primary inline-flex items-center gap-2 text-base py-3 px-8"
            >
              <Users size={18} />
              Solicitar Mentoría
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 animated-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
            <Rocket size={32} className="text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            ¿Listo para crear con <span className="gradient-text">IA?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Tienes toda la información que necesitas. Ahora es el momento de explorar, experimentar y crear videos increíbles con la ayuda de la inteligencia artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/ruta-aprendizaje")}
              className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-8"
            >
              <Play size={18} />
              Comenzar mi Ruta de Aprendizaje
            </button>
            <button
              onClick={() => document.getElementById("tabla").scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-8"
            >
              <Star size={18} />
              Ver Comparativa Completa
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/10 py-8 px-4 text-center">
        <p className="text-gray-500 text-sm">
          AIVideoGuide — La guía más completa de IAs para edición y generación de video • 2025
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Información actualizada regularmente. Los planes y límites pueden cambiar según las plataformas.
        </p>
      </footer>
    </div>
  );
}
