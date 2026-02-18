import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, BookOpen, Users, Brain, Timer, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Firebase auth
    navigate("/home");
  };

  const features = [
    { icon: Timer, label: "Pomodoro & Focus", desc: "Track study sessions with smart timers" },
    { icon: Users, label: "Community", desc: "Ask doubts & learn with peers" },
    { icon: Brain, label: "AI Tutor", desc: "Get instant help from AI" },
    { icon: BookOpen, label: "Study Stats", desc: "GitHub-style heatmap & analytics" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBlobs />

      {/* Hero */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-button p-0">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gradient">Study Zone</span>
          </div>
        </header>

        {/* Main */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
            {/* Left: Hero content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your study community awaits</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Study smarter,{" "}
                <span className="text-gradient">together.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Focus sessions, AI tutoring, community doubts, streak tracking — everything you need to crush your goals. Built for students who mean business.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card p-4 rounded-xl space-y-2 group hover:border-primary/30 transition-colors"
                  >
                    <f.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Auth form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold">{isLogin ? "Welcome back" : "Join the Zone"}</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isLogin ? "Log in to continue your streak" : "Create your account to get started"}
                  </p>
                </div>

                {/* Google */}
                <button
                  onClick={() => navigate("/home")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-all text-sm font-medium mb-6"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border/50" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border/50" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full glow-button rounded-xl py-3 flex items-center justify-center gap-2 font-semibold">
                    {isLogin ? "Log In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
