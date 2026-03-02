import { ArrowDown, Sparkles, Play, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg hero-gradient">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <Sparkles size={14} className="text-violet-400" />
          <span className="text-sm text-violet-300 font-medium">14 IAs de Edición de Video Analizadas</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up animate-delay-100 leading-tight">
          <span className="text-white">Domina las </span>
          <span className="gradient-text">IAs de Video</span>
          <br />
          <span className="text-white">más Poderosas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up animate-delay-200 leading-relaxed">
          La guía más completa para aprender, comparar y dominar todas las herramientas de inteligencia artificial
          para edición y generación de video. Desde principiante hasta profesional.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up animate-delay-300">
          {[
            { value: "14", label: "IAs Analizadas" },
            { value: "100%", label: "Actualizado 2025" },
            { value: "500+", label: "Usuarios Aprenden" },
            { value: "5", label: "Niveles de Aprendizaje" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animate-delay-400">
          <a href="#tabla" className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-8">
            <Play size={18} />
            Explorar Herramientas
          </a>
          <a href="/ruta-aprendizaje" className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-8">
            <Star size={18} />
            Ruta de Aprendizaje
          </a>
        </div>

        {/* Featured tools preview */}
        <div className="animate-fade-in-up animate-delay-500">
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Herramientas incluidas</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["🎬 Runway ML", "⚡ Pika Labs", "🌀 Sora", "🧑‍💼 HeyGen", "✂️ CapCut", "💫 Luma AI", "🐉 Kling AI", "🎭 Synthesia"].map((tool) => (
              <span
                key={tool}
                className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Descubrir</span>
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
