import React from "react";
import {
  Sparkles,
  Utensils,
  Laptop,
  Briefcase,
  Compass,
  GraduationCap,
  Layers,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Building2,
  Globe,
  Eye,
  ShoppingBag,
  Target,
  MessageCircle,
  ExternalLink,
  Video,
  Tv,
  Camera,
  FileText,
  BarChart3,
  Smile,
  ShieldCheck,
  Palette,
  BookOpen,
  Gem,
  Clock,
  Timer,
  Flame,
  Rocket,
  Check,
} from "lucide-react";

interface QuizIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function QuizIcon({ name, className = "w-5 h-5", size = 20 }: QuizIconProps) {
  const iconProps = { className, size };

  switch (name) {
    case "Sparkles": return <Sparkles {...iconProps} />;
    case "Utensils": return <Utensils {...iconProps} />;
    case "Laptop": return <Laptop {...iconProps} />;
    case "Briefcase": return <Briefcase {...iconProps} />;
    case "Compass": return <Compass {...iconProps} />;
    case "GraduationCap": return <GraduationCap {...iconProps} />;
    case "Layers": return <Layers {...iconProps} />;
    case "Zap": return <Zap {...iconProps} />;
    case "Users": return <Users {...iconProps} />;
    case "TrendingUp": return <TrendingUp {...iconProps} />;
    case "Heart": return <Heart {...iconProps} />;
    case "Building2": return <Building2 {...iconProps} />;
    case "Globe": return <Globe {...iconProps} />;
    case "Eye": return <Eye {...iconProps} />;
    case "ShoppingBag": return <ShoppingBag {...iconProps} />;
    case "Target": return <Target {...iconProps} />;
    case "MessageCircle": return <MessageCircle {...iconProps} />;
    case "ExternalLink": return <ExternalLink {...iconProps} />;
    case "Video": return <Video {...iconProps} />;
    case "Tv": return <Tv {...iconProps} />;
    case "Camera": return <Camera {...iconProps} />;
    case "FileText": return <FileText {...iconProps} />;
    case "BarChart3": return <BarChart3 {...iconProps} />;
    case "Smile": return <Smile {...iconProps} />;
    case "ShieldCheck": return <ShieldCheck {...iconProps} />;
    case "Palette": return <Palette {...iconProps} />;
    case "BookOpen": return <BookOpen {...iconProps} />;
    case "Gem": return <Gem {...iconProps} />;
    case "Clock": return <Clock {...iconProps} />;
    case "Timer": return <Timer {...iconProps} />;
    case "Flame": return <Flame {...iconProps} />;
    case "Rocket": return <Rocket {...iconProps} />;
    case "Check": return <Check {...iconProps} />;
    default: return <Sparkles {...iconProps} />;
  }
}
