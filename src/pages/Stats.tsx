import { motion } from "framer-motion";
import { BarChart3, Clock, Flame, Trophy, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", mins: 90 }, { day: "Tue", mins: 120 }, { day: "Wed", mins: 45 },
  { day: "Thu", mins: 180 }, { day: "Fri", mins: 60 }, { day: "Sat", mins: 150 }, { day: "Sun", mins: 30 },
];

const subjectData = [
  { name: "Math", value: 240, color: "hsl(175, 80%, 47%)" },
  { name: "Physics", value: 180, color: "hsl(260, 70%, 58%)" },
  { name: "CS", value: 150, color: "hsl(330, 70%, 60%)" },
  { name: "Chemistry", value: 90, color: "hsl(38, 92%, 50%)" },
];

// Generate heatmap data for ~3 months
const generateHeatmap = () => {
  const data: number[] = [];
  for (let i = 0; i < 91; i++) {
    data.push(Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0);
  }
  return data;
};

const heatmapData = generateHeatmap();

const Stats = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Clock, label: "This Week", value: "675 min", sub: "+12% vs last week" },
          { icon: Flame, label: "Best Streak", value: "14 days", sub: "Current: 7" },
          { icon: TrendingUp, label: "Avg Session", value: "38 min", sub: "22 sessions" },
          { icon: Trophy, label: "Rank", value: "#3", sub: "Among friends" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card-hover p-4 rounded-2xl">
            <s.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs text-primary mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Study Heatmap</h3>
        </div>
        <div className="grid grid-cols-13 gap-1">
          {heatmapData.map((level, i) => (
            <div key={i} className={`w-full aspect-square rounded-sm heatmap-cell-${level} transition-colors hover:ring-1 hover:ring-primary/30`}
              title={`${level * 15} minutes`} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-xs text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`w-3 h-3 rounded-sm heatmap-cell-${l}`} />
          ))}
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 rounded-2xl">
          <h3 className="font-semibold mb-4">Minutes This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: 12 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="mins" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5 rounded-2xl">
          <h3 className="font-semibold mb-4">By Subject</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={subjectData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4} strokeWidth={0}>
                {subjectData.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {subjectData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
