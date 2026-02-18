import { useState } from "react";
import { motion } from "framer-motion";
import { User, Palette, Shield, LogOut, Check } from "lucide-react";

const themes = [
  { key: "neon", label: "Neon", desc: "Cyan & electric", preview: "from-cyan-500 to-purple-500" },
  { key: "lofi", label: "Lofi", desc: "Warm & earthy", preview: "from-green-600 to-amber-600" },
  { key: "sakura", label: "Sakura", desc: "Soft pinks", preview: "from-pink-500 to-purple-400" },
];

const Settings = () => {
  const [displayName, setDisplayName] = useState("StudyKing");
  const [username, setUsername] = useState("studyking");
  const [pfpUrl, setPfpUrl] = useState("");
  const [currentTheme, setCurrentTheme] = useState("neon");
  const [hideOnline, setHideOnline] = useState(false);
  const [hideStats, setHideStats] = useState(false);

  const applyTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={pfpUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=0ea5e9`}
            alt="" className="w-16 h-16 rounded-full ring-2 ring-primary/20"
          />
          <div>
            <p className="font-semibold">{displayName}</p>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Profile Picture URL</label>
            <input value={pfpUrl} onChange={(e) => setPfpUrl(e.target.value)} placeholder="https://..."
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button className="glow-button rounded-xl px-6 py-2.5 text-sm font-semibold">Save Changes</button>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Theme</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.key}
              onClick={() => applyTheme(t.key)}
              className={`p-4 rounded-xl text-center transition-all border ${
                currentTheme === t.key ? "border-primary bg-primary/5 shadow-[0_0_12px_hsl(var(--primary)/0.2)]" : "border-border/50 bg-secondary/20 hover:bg-secondary/40"
              }`}
            >
              <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.preview} mb-3`} />
              <p className="text-sm font-semibold flex items-center justify-center gap-1.5">
                {t.label}
                {currentTheme === t.key && <Check className="w-4 h-4 text-primary" />}
              </p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Privacy</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Hide online status", desc: "Others won't see when you're online", value: hideOnline, set: setHideOnline },
            { label: "Hide stats from non-friends", desc: "Only friends can view your study stats", value: hideStats, set: setHideStats },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20">
              <div>
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <button
                onClick={() => p.set(!p.value)}
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${p.value ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all duration-200 ${p.value ? "left-5.5" : "left-0.5"}`}
                  style={{ left: p.value ? "22px" : "2px", background: p.value ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))" }} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-colors font-medium text-sm">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
