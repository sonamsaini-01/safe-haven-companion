import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

const SOSButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);

  const cancelSOS = useCallback(() => {
    setIsActive(false);
    setCountdown(5);
    setAlertSent(false);
  }, []);

  useEffect(() => {
    if (!isActive || alertSent) return;
    if (countdown <= 0) {
      setAlertSent(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isActive, countdown, alertSent]);

  return (
    <>
      {/* Floating SOS Button */}
      <motion.button
        onClick={() => setIsActive(true)}
        className="fixed bottom-24 right-4 z-50 w-16 h-16 rounded-full bg-sos flex items-center justify-center shadow-sos"
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="absolute inset-0 rounded-full bg-sos animate-ripple" />
        <ShieldAlert className="w-7 h-7 text-destructive-foreground relative z-10" />
      </motion.button>

      {/* SOS Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-sos/95 flex flex-col items-center justify-center p-6"
          >
            {!alertSent ? (
              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div
                  className="w-32 h-32 rounded-full border-4 border-destructive-foreground/30 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <span className="text-6xl font-extrabold text-destructive-foreground">{countdown}</span>
                </motion.div>
                <p className="text-xl font-bold text-destructive-foreground">Sending SOS Alert...</p>
                <p className="text-destructive-foreground/80 text-sm">
                  Alert will be sent to your emergency contacts and nearby authorities
                </p>
                <button
                  onClick={cancelSOS}
                  className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full bg-destructive-foreground/20 text-destructive-foreground font-semibold text-lg backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-destructive-foreground/20 flex items-center justify-center">
                  <ShieldAlert className="w-12 h-12 text-destructive-foreground" />
                </div>
                <p className="text-2xl font-bold text-destructive-foreground">🚨 SOS Alert Sent!</p>
                <p className="text-destructive-foreground/80">
                  Your emergency contacts and nearby authorities have been notified.
                  Live tracking is now active.
                </p>
                <button
                  onClick={cancelSOS}
                  className="mt-6 px-8 py-3 rounded-full bg-destructive-foreground text-sos font-semibold"
                >
                  I'm Safe Now
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
