import { motion } from "framer-motion";
import { User, Shield, Bell, Moon, Lock, LogOut, ChevronRight, MapPin, Clock, BadgeCheck } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: Bell, label: "Notifications", desc: "Alert preferences" },
  { icon: MapPin, label: "Location Settings", desc: "Tracking & sharing" },
  { icon: Lock, label: "Privacy & Security", desc: "Data protection" },
  { icon: Moon, label: "Appearance", desc: "Dark mode & themes" },
  { icon: Clock, label: "Alert History", desc: "Past SOS alerts" },
  { icon: Shield, label: "Verification", desc: "ID & face verification" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile header */}
      <div className="gradient-hero px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-primary-foreground">Priya Sharma</h1>
              <BadgeCheck className="w-5 h-5 text-safe" />
            </div>
            <p className="text-sm text-primary-foreground/70">priya@email.com</p>
            <p className="text-xs text-primary-foreground/50 mt-0.5">Verified User • Member since 2024</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Stats */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: "47", label: "Days Active" },
              { num: "3", label: "Contacts" },
              { num: "12", label: "Reports" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-lg font-extrabold text-primary">{s.num}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full mt-4 bg-unsafe/10 rounded-2xl p-4 flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5 text-unsafe" />
          <span className="text-sm font-semibold text-unsafe">Log Out</span>
        </button>
      </div>

      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default Profile;
