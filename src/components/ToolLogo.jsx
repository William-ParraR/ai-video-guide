import { useState } from "react";
import {
  Film, Zap, Wind, UserCircle, PenTool, Scissors, Theater, Video,
  Sparkles, Swords, Camera, Flame, Clapperboard, Mic, Sprout, Banana,
} from "lucide-react";

const ICON_MAP = {
  Film, Zap, Wind, UserCircle, PenTool, Scissors, Theater, Video,
  Sparkles, Swords, Camera, Flame, Clapperboard, Mic, Sprout, Banana,
};

export default function ToolLogo({ tool, sizeClass = "w-12 h-12", textSize = "text-2xl" }) {
  const [imgFailed, setImgFailed] = useState(false);

  const logoUrl = tool.logoUrl
    ? tool.logoUrl
    : `https://logo.clearbit.com/${tool.logoDomain}`;

  const showIcon = imgFailed || (!tool.logoUrl && !tool.logoDomain);
  const Icon = ICON_MAP[tool.logo];

  return (
    <div
      className={`${sizeClass} rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0`}
    >
      {!showIcon ? (
        <img
          src={logoUrl}
          alt={`${tool.name} logo`}
          className="w-full h-full object-contain p-1.5 bg-white rounded-xl"
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : Icon ? (
        <Icon className="text-white w-1/2 h-1/2" />
      ) : (
        <span className={textSize}>{tool.logo}</span>
      )}
    </div>
  );
}
