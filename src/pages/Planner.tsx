import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle2, Circle, Calendar, Trash2 } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  subject: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Planner = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Review calculus chapter 5", done: true, subject: "Mathematics" },
    { id: "2", text: "Solve physics problem set", done: false, subject: "Physics" },
    { id: "3", text: "Read CS notes on algorithms", done: false, subject: "Computer Science" },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), text: newTask, done: false, subject: "General" }]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Week bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">This Week</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDay(i)}
              className={`py-2 rounded-xl text-center text-sm font-medium transition-all ${
                selectedDay === i
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                  : "bg-secondary/20 text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{doneCount}/{tasks.length}</span>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: tasks.length ? `${(doneCount / tasks.length) * 100}%` : "0%" }} />
        </div>
      </motion.div>

      {/* Add task */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 rounded-2xl">
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={addTask} className="glow-button rounded-xl px-4 py-2.5">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Tasks */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-2">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 rounded-xl flex items-center gap-3 group transition-all ${task.done ? "opacity-60" : ""}`}
          >
            <button onClick={() => toggleTask(task.id)}>
              {task.done
                ? <CheckCircle2 className="w-5 h-5 text-success" />
                : <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary transition-colors" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</p>
              <p className="text-xs text-muted-foreground">{task.subject}</p>
            </div>
            <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Planner;
