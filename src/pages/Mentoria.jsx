import { useState } from "react";
import { Users, CheckCircle, AlertCircle, ArrowLeft, Mail, User, Send } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_MENTORIA_API_URL || "";

export default function Mentoria() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      if (!API_URL) {
        throw new Error("API no configurada. Ejecuta lambda/deploy.sh para desplegar el backend.");
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar solicitud");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Error inesperado. Intenta nuevamente.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen animated-gradient-bg hero-gradient pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors text-sm mb-10"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Mentoría <span className="gradient-text">Personalizada</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Aprende a dominar las IAs de video con guía 1 a 1 adaptada a tu nivel y objetivos.
            Regístrate y me pondré en contacto contigo.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { title: "Sesiones 1 a 1", desc: "Atención personalizada enfocada en tus metas" },
            { title: "Todos los niveles", desc: "Desde principiante hasta creador avanzado" },
            { title: "Herramientas reales", desc: "Práctica con Runway, Pika, Kling y más" },
          ].map((b) => (
            <div key={b.title} className="card-glass p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
              <p className="text-gray-500 text-xs">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="card-glass p-8 sm:p-10">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Solicitud recibida</h2>
              <p className="text-gray-400 mb-6">
                Gracias, <span className="text-violet-400 font-medium">{nombre}</span>. Me pondré
                en contacto a través de <span className="text-violet-400">{email}</span> pronto.
              </p>
              <button
                onClick={() => { setStatus("idle"); setNombre(""); setEmail(""); }}
                className="btn-secondary text-sm py-2 px-6"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Nombre completo
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    minLength={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-9 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-9 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !nombre.trim() || !email.trim()}
                className="btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Solicitar Mentoría
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Tu información es confidencial y solo se usará para coordinar la mentoría.
        </p>
      </div>
    </div>
  );
}
