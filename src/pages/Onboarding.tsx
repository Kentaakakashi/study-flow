import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, BookOpen, Sparkles } from "lucide-react";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "History", "English", "Economics", "Psychology", "Art & Design",
  "Music", "Languages", "Philosophy", "Engineering", "Medicine",
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleFinish = () => {
    navigate("/home");
  };

  const steps = [
    {
      title: "Choose your identity",
      subtitle: "Pick a unique username for the community",
      content: (
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                placeholder="studyking"
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Display Name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Alex Chen"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Profile Picture URL <span className="text-muted-foreground">(optional)</span></label>
            <input
              value={pfpUrl}
              onChange={(e) => setPfpUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {(pfpUrl || username) && (
            <div className="flex items-center gap-3 p-4 glass-card rounded-xl">
              <img
                src={pfpUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${username || "SZ"}&backgroundColor=0ea5e9`}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{displayName || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">@{username || "username"}</p>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "What do you study?",
      subtitle: "Select your subjects to personalize your experience",
      content: (
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => toggleSubject(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSubjects.includes(s)
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-lg w-full"
      >
        <div className="glass-card p-8 rounded-2xl">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <div className="flex items-center gap-3 mb-2">
            {step === 0 ? <User className="w-6 h-6 text-primary" /> : <BookOpen className="w-6 h-6 text-primary" />}
            <h2 className="text-2xl font-bold">{steps[step].title}</h2>
          </div>
          <p className="text-muted-foreground mb-8">{steps[step].subtitle}</p>

          {steps[step].content}

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Back
              </button>
            )}
            <button
              onClick={() => (step < steps.length - 1 ? setStep(step + 1) : handleFinish())}
              className="ml-auto glow-button rounded-xl px-6 py-2.5 flex items-center gap-2 text-sm font-semibold"
            >
              {step < steps.length - 1 ? "Continue" : "Enter the Zone"}
              {step < steps.length - 1 ? <ArrowRight className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
