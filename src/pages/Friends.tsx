import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, UserCheck, UserX, Clock, X, Timer, Users } from "lucide-react";

interface User {
  uid: string;
  name: string;
  username: string;
  avatar: string;
  status: "online" | "studying" | "idle" | "offline";
  subject?: string;
}

const mockFriends: User[] = [
  { uid: "1", name: "Alex Chen", username: "alexc", avatar: "A", status: "studying", subject: "Physics" },
  { uid: "2", name: "Maya Rivera", username: "mayar", avatar: "M", status: "online" },
  { uid: "3", name: "Jordan Kim", username: "jordank", avatar: "J", status: "idle" },
  { uid: "4", name: "Sarah Park", username: "sarahp", avatar: "S", status: "offline" },
];

const mockIncoming = [
  { uid: "5", name: "David Liu", username: "davidl", avatar: "D" },
];

const Friends = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"friends" | "incoming" | "search">("friends");

  const statusDot = (s: string) => {
    if (s === "studying") return "presence-studying";
    if (s === "online") return "presence-online";
    if (s === "idle") return "presence-idle";
    return "w-2.5 h-2.5 rounded-full bg-muted-foreground/30";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-1.5 rounded-2xl flex gap-1">
        {[
          { key: "friends" as const, label: "Friends", count: mockFriends.length },
          { key: "incoming" as const, label: "Requests", count: mockIncoming.length },
          { key: "search" as const, label: "Find Users", count: 0 },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {t.count > 0 && tab !== t.key && (
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{t.count}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Search */}
      {tab === "search" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by username..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </motion.div>
      )}

      {/* Friends list */}
      {tab === "friends" && (
        <div className="space-y-2">
          {mockFriends.map((f, i) => (
            <motion.div key={f.uid} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-4 rounded-xl flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">{f.avatar}</div>
                <div className={`absolute -bottom-0.5 -right-0.5 ${statusDot(f.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-muted-foreground">@{f.username}{f.subject ? ` • Studying ${f.subject}` : ""}</p>
              </div>
              {f.status === "studying" && (
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Timer className="w-3 h-3" /> Join
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Incoming */}
      {tab === "incoming" && (
        <div className="space-y-2">
          {mockIncoming.length === 0 ? (
            <div className="glass-card p-10 rounded-2xl text-center">
              <Clock className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">No pending requests</p>
            </div>
          ) : (
            mockIncoming.map((r) => (
              <motion.div key={r.uid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 rounded-xl flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm font-bold text-primary-foreground">{r.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">@{r.username}</p>
                </div>
                <button className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"><UserCheck className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"><X className="w-4 h-4" /></button>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Search results */}
      {tab === "search" && search && (
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">E</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Emily Zhang</p>
            <p className="text-xs text-muted-foreground">@emilyz</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <UserPlus className="w-3 h-3" /> Add
          </button>
        </div>
      )}

      {tab === "search" && !search && (
        <div className="glass-card p-10 rounded-2xl text-center">
          <Users className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">Search for users by their username</p>
        </div>
      )}
    </div>
  );
};

export default Friends;
