import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, CheckCircle, MessageSquare, ChevronRight, Send, ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  author: string;
  username: string;
  avatar: string;
  title: string;
  body: string;
  subject: string;
  time: string;
  replies: number;
  solved: boolean;
}

interface Reply {
  id: string;
  author: string;
  username: string;
  avatar: string;
  text: string;
  time: string;
  accepted: boolean;
}

const mockPosts: Post[] = [
  { id: "1", author: "Alex Chen", username: "alexc", avatar: "A", title: "How to solve differential equations?", body: "I'm struggling with second-order ODEs. Can someone explain the method of undetermined coefficients?", subject: "Mathematics", time: "2h ago", replies: 3, solved: true },
  { id: "2", author: "Maya Rivera", username: "mayar", avatar: "M", title: "Best resources for learning React hooks?", body: "Looking for good tutorials or courses on advanced React patterns.", subject: "Computer Science", time: "4h ago", replies: 5, solved: false },
  { id: "3", author: "Jordan Kim", username: "jordank", avatar: "J", title: "Newton's third law confusion", body: "If every action has an equal reaction, why does anything move?", subject: "Physics", time: "1d ago", replies: 8, solved: true },
];

const mockReplies: Reply[] = [
  { id: "r1", author: "Sarah Park", username: "sarahp", avatar: "S", text: "Great question! The key insight is that the forces act on different objects. When you push a wall, the wall pushes back on you, but the forces are on different bodies.", time: "1h ago", accepted: true },
  { id: "r2", author: "David Liu", username: "davidl", avatar: "D", text: "Think of it this way: you push a cart, the cart pushes back on your hand, but the net force on the cart system is what matters for its acceleration.", time: "45m ago", accepted: false },
];

const Community = () => {
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newReply, setNewReply] = useState("");

  const filteredPosts = mockPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </button>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">{selectedPost.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{selectedPost.author}</span>
                <span className="text-xs text-muted-foreground">@{selectedPost.username}</span>
                <span className="text-xs text-muted-foreground">• {selectedPost.time}</span>
                {selectedPost.solved && <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">Solved</span>}
              </div>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{selectedPost.subject}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-3">{selectedPost.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{selectedPost.body}</p>
        </motion.div>

        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide px-1">Replies ({mockReplies.length})</h3>
        {mockReplies.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`glass-card p-5 rounded-xl ${r.accepted ? "border-success/30 bg-success/5" : ""}`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{r.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{r.author}</span>
                  <span className="text-xs text-muted-foreground">@{r.username} • {r.time}</span>
                  {r.accepted && <CheckCircle className="w-4 h-4 text-success" />}
                </div>
                <p className="text-sm mt-2 leading-relaxed">{r.text}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="glass-card p-4 rounded-2xl flex gap-2">
          <input value={newReply} onChange={(e) => setNewReply(e.target.value)} placeholder="Write a reply..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button className="glow-button rounded-xl px-4"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doubts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="glow-button rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-semibold">
          <Plus className="w-4 h-4" /> Post
        </button>
      </div>

      {/* Create */}
      {showCreate && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5 rounded-2xl space-y-3">
          <input placeholder="Title" className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <textarea placeholder="Describe your doubt..." className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24" />
          <div className="flex justify-end">
            <button className="glow-button rounded-xl px-6 py-2.5 text-sm font-semibold">Submit</button>
          </div>
        </motion.div>
      )}

      {/* Posts */}
      {filteredPosts.map((post, i) => (
        <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          onClick={() => setSelectedPost(post)}
          className="glass-card-hover p-5 rounded-2xl cursor-pointer group">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">{post.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-semibold">{post.author}</span>
                <span className="text-xs text-muted-foreground">@{post.username}</span>
                <span className="text-xs text-muted-foreground">• {post.time}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.subject}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MessageSquare className="w-3 h-3" /> {post.replies}</span>
                {post.solved && <span className="flex items-center gap-1 text-xs text-success"><CheckCircle className="w-3 h-3" /> Solved</span>}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Community;
