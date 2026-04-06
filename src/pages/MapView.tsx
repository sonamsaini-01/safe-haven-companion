import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Shield, AlertTriangle, Star, Search, Layers } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import BottomNav from "@/components/BottomNav";

const safetyZones = [
  { id: 1, name: "Connaught Place", rating: 85, reviews: 234, status: "safe" as const },
  { id: 2, name: "Karol Bagh Market", rating: 62, reviews: 128, status: "moderate" as const },
  { id: 3, name: "Paharganj Area", rating: 28, reviews: 89, status: "unsafe" as const },
  { id: 4, name: "Saket Mall Area", rating: 91, reviews: 312, status: "safe" as const },
  { id: 5, name: "Old Delhi", rating: 35, reviews: 156, status: "unsafe" as const },
];

const statusConfig = {
  safe: { color: "bg-safe", text: "text-safe", label: "Safe", icon: Shield },
  moderate: { color: "bg-moderate", text: "text-moderate", label: "Moderate", icon: AlertTriangle },
  unsafe: { color: "bg-unsafe", text: "text-unsafe", label: "Unsafe", icon: AlertTriangle },
};

const MapView = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "safe" | "moderate" | "unsafe">("all");
  const [view, setView] = useState<"list" | "map">("map");

  const filtered = activeFilter === "all" ? safetyZones : safetyZones.filter((z) => z.status === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-1">Safety Map</h1>
        <p className="text-muted-foreground text-sm mb-4">Explore area safety ratings</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for a location..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card shadow-card text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(["all", "safe", "moderate", "unsafe"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                activeFilter === f
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-card text-card-foreground shadow-card"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("map")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
              view === "map" ? "gradient-primary text-primary-foreground" : "bg-card text-card-foreground"
            }`}
          >
            <MapPin className="w-4 h-4" /> Map
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
              view === "list" ? "gradient-primary text-primary-foreground" : "bg-card text-card-foreground"
            }`}
          >
            <Layers className="w-4 h-4" /> List
          </button>
        </div>
      </div>

      {view === "map" ? (
        /* Map placeholder */
        <div className="mx-4 rounded-3xl overflow-hidden shadow-card h-64 bg-card relative">
          <div className="absolute inset-0 bg-gradient-to-br from-safe/10 via-moderate/10 to-unsafe/10" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
            <MapPin className="w-10 h-10 text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Interactive map with heatmap</p>
            <p className="text-xs text-muted-foreground">Connect Google Maps API to enable</p>
          </div>
          {/* Sample markers */}
          <div className="absolute top-8 left-12 w-4 h-4 rounded-full bg-safe shadow-lg animate-pulse" />
          <div className="absolute top-20 right-16 w-4 h-4 rounded-full bg-unsafe shadow-lg animate-pulse" />
          <div className="absolute bottom-16 left-1/3 w-4 h-4 rounded-full bg-moderate shadow-lg animate-pulse" />
          <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-safe shadow-lg animate-pulse" />
        </div>
      ) : null}

      {/* Locations List */}
      <div className="px-4 mt-4 space-y-2">
        <h3 className="text-sm font-bold text-foreground">
          {view === "map" ? "Nearby Areas" : "All Areas"}
        </h3>
        {filtered.map((zone, i) => {
          const config = statusConfig[zone.status];
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl ${config.color}/15 flex items-center justify-center`}>
                <config.icon className={`w-5 h-5 ${config.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{zone.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-moderate fill-moderate" />
                    <span className="text-xs text-muted-foreground">{zone.reviews} reviews</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-extrabold ${config.text}`}>{zone.rating}</p>
                <p className="text-[10px] text-muted-foreground">/100</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-3 shadow-card">
        <p className="text-xs font-semibold text-card-foreground mb-2">Safety Legend</p>
        <div className="flex gap-4">
          {[
            { color: "bg-safe", label: "Safe (70+)" },
            { color: "bg-moderate", label: "Moderate (40-69)" },
            { color: "bg-unsafe", label: "Unsafe (<40)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default MapView;
