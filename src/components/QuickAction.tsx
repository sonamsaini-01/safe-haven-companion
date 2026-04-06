import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  to: string;
  gradient?: boolean;
}

const QuickAction = ({ icon: Icon, label, to, gradient }: QuickActionProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${
        gradient ? "gradient-primary shadow-soft" : "bg-card shadow-card"
      }`}
    >
      <Icon className={`w-6 h-6 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
      <span className={`text-xs font-semibold ${gradient ? "text-primary-foreground" : "text-card-foreground"}`}>
        {label}
      </span>
    </motion.button>
  );
};

export default QuickAction;
