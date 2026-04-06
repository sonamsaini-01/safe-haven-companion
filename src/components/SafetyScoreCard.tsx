import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface SafetyScoreCardProps {
  score: number;
  label: string;
}

const SafetyScoreCard = ({ score, label }: SafetyScoreCardProps) => {
  const getColor = () => {
    if (score >= 70) return "text-safe";
    if (score >= 40) return "text-moderate";
    return "text-unsafe";
  };

  const getBarColor = () => {
    if (score >= 70) return "bg-safe";
    if (score >= 40) return "bg-moderate";
    return "bg-unsafe";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 shadow-card"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{label}</p>
          <p className={`text-2xl font-extrabold ${getColor()}`}>{score}/100</p>
        </div>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${getBarColor()}`}
        />
      </div>
    </motion.div>
  );
};

export default SafetyScoreCard;
