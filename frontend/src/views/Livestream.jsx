"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv2,
  Radio,
  Settings,
  Users,
  Clock,
  Wifi,
  Bot,
  Mic,
  Lightbulb,
  MessageSquare,
  Send,
  Copy,
  Check,
  MicOff,
  VideoOff,
  Video,
  Volume2,
  VolumeX,
  Activity,
} from "lucide-react";
import { NeuCard, NeuButton, LiveBadge, SectionHeader } from "../components/ui";

const CHAT_SAMPLES = [
  "Hey, great stream! 🔥",
  "Can you explain that again?",
  "This is super helpful, thanks!",
  "What version of Node are you using?",
  "LFG! Keep going 💪",
  "Subscribed! Love the content",
  "Can you share the GitHub link?",
  "First time watching — amazing quality",
];
const NAMES = [
  "alice_dev",
  "codebro99",
  "js_enjoyer",
  "reactwizard",
  "devlearn22",
  "techkat",
  "fullstackfan",
];

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Livestream() {
  const [title, setTitle] = useState(
    "React + TypeScript Deep Dive — Live Coding",
  );
  const [rtmpKey, setRtmpKey] = useState("");
  const [quality, setQuality] = useState("1080p60");
  const [online, setOnline] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [viewers, setViewers] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [chat, setChat] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const [copied, setCopied] = useState(false);
  const chatRef = useRef(null);
  const timerRef = useRef(null);
  const chatBotRef = useRef(null);

  // Stream timer
  useEffect(() => {
    if (online) {
      setElapsed(0);
      setViewers(1);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      // Simulate viewer growth
      chatBotRef.current = setInterval(() => {
        setViewers((v) => v + Math.floor(Math.random() * 3));
        // Random chat messages
        if (Math.random() > 0.4) {
          const name = NAMES[Math.floor(Math.random() * NAMES.length)];
          const msg =
            CHAT_SAMPLES[Math.floor(Math.random() * CHAT_SAMPLES.length)];
          setChat((c) => [
            ...c.slice(-50),
            { id: Date.now(), name, msg, bot: true },
          ]);
        }
      }, 3500);
    } else {
      clearInterval(timerRef.current);
      clearInterval(chatBotRef.current);
      setViewers(0);
    }
    return () => {
      clearInterval(timerRef.current);
      clearInterval(chatBotRef.current);
    };
  }, [online]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  const copyRtmp = () => {
    navigator.clipboard.writeText(
      "rtmp://a.rtmp.youtube.com/live2/" + (rtmpKey || "xxxx-xxxx-xxxx"),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setChat((c) => [
      ...c,
      { id: Date.now(), name: "you", msg: msgInput.trim(), own: true },
    ]);
    setMsgInput("");
  };

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Live Stream"
        sub="Share your learning journey live on YouTube"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Config Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Settings size={15} className="text-slate-400" /> Stream
              Configuration
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Stream Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={online}
                  className="w-full neu-in rounded-xl px-3 py-2.5 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 disabled:opacity-50"
                  placeholder="e.g. Solving LeetCode Live!"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  YouTube RTMP Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={rtmpKey}
                    onChange={(e) => setRtmpKey(e.target.value)}
                    disabled={online}
                    className="flex-1 neu-in rounded-xl px-3 py-2.5 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 disabled:opacity-50"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <NeuButton onClick={copyRtmp} className="!px-3 shrink-0">
                    {copied ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </NeuButton>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Get this from YouTube Studio → Live → Stream
                </p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  disabled={online}
                  className="w-full neu-in rounded-xl px-3 py-2.5 text-sm bg-[var(--neu-bg)] text-slate-700 dark:text-slate-200 outline-none border-0 cursor-pointer disabled:opacity-50"
                >
                  <option value="1080p60">1080p 60fps (Recommended)</option>
                  <option value="720p60">720p 60fps</option>
                  <option value="720p30">720p 30fps</option>
                  <option value="480p">480p</option>
                </select>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4">
              <NeuButton
                variant="primary"
                className="flex-1"
                style={
                  online
                    ? { background: "linear-gradient(135deg,#475569,#334155)" }
                    : {
                        background: "linear-gradient(135deg,#ff4757,#ff6b81)",
                        boxShadow: "0 4px 14px rgba(255,71,87,0.4)",
                      }
                }
                onClick={() => setOnline((o) => !o)}
              >
                <Radio size={14} /> {online ? "End Stream" : "Go Live Now"}
              </NeuButton>
              <NeuButton
                onClick={() => setMuted((m) => !m)}
                className="!px-3"
                title="Mute/Unmute"
              >
                {muted ? (
                  <MicOff size={15} className="text-red-400" />
                ) : (
                  <Mic size={15} />
                )}
              </NeuButton>
              <NeuButton
                onClick={() => setCamOff((c) => !c)}
                className="!px-3"
                title="Camera on/off"
              >
                {camOff ? (
                  <VideoOff size={15} className="text-red-400" />
                ) : (
                  <Video size={15} />
                )}
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeuCard className="bg-slate-900 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Tv2 size={15} className="text-red-400" /> Preview
              </h3>
              <LiveBadge online={online} />
            </div>

            {/* "Screen" area */}
            <div className="bg-slate-800 rounded-xl flex items-center justify-center min-h-[140px] mb-4 relative overflow-hidden">
              {online ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-teal-900/30" />
                  <div className="text-center z-10">
                    <Activity
                      size={28}
                      className="text-violet-400 mx-auto mb-1 animate-pulse"
                    />
                    <p className="text-xs text-slate-300 font-semibold">
                      BROADCASTING LIVE
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {title}
                    </p>
                  </div>
                  {/* Scan line animation */}
                  <motion.div
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-x-0 h-0.5 bg-violet-500/20 pointer-events-none"
                  />
                </>
              ) : (
                <div className="text-center opacity-40">
                  <Wifi size={30} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">
                    Preview will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                {
                  icon: Users,
                  val: online ? viewers.toLocaleString() : "--",
                  label: "Viewers",
                },
                {
                  icon: Clock,
                  val: online ? formatTime(elapsed) : "--:--",
                  label: "Duration",
                },
                { icon: Wifi, val: quality.toUpperCase(), label: "Quality" },
              ].map(({ icon: Icon, val, label }) => (
                <div
                  key={label}
                  className="bg-slate-800 rounded-xl text-center py-3"
                >
                  <div className="text-sm font-extrabold text-white font-mono">
                    {val}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mute/Cam indicators */}
            <div className="flex gap-2">
              <div
                className={`flex-1 rounded-lg py-1.5 text-center text-[10px] font-bold ${muted ? "bg-red-900/40 text-red-400" : "bg-slate-800 text-slate-400"}`}
              >
                {muted ? "🔇 Muted" : "🎤 Live Mic"}
              </div>
              <div
                className={`flex-1 rounded-lg py-1.5 text-center text-[10px] font-bold ${camOff ? "bg-red-900/40 text-red-400" : "bg-slate-800 text-slate-400"}`}
              >
                {camOff ? "📵 Cam Off" : "📹 Cam On"}
              </div>
            </div>
          </NeuCard>
        </motion.div>

        {/* Live Chat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <MessageSquare size={15} className="text-violet-500" /> Live
                Chat
                {online && (
                  <span className="text-[9px] font-bold text-emerald-500 neu-in px-2 py-0.5 rounded-md animate-pulse">
                    LIVE
                  </span>
                )}
              </h3>
              <span className="text-xs text-slate-400">
                {chat.length} messages
              </span>
            </div>

            {/* Chat messages */}
            <div
              ref={chatRef}
              className="neu-in rounded-xl p-3 h-52 overflow-y-auto space-y-2 mb-3"
            >
              {chat.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                  {online ? "Waiting for messages…" : "Go live to enable chat"}
                </div>
              ) : (
                chat.map(({ id, name, msg, own, bot }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: own ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 ${own ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full gradient-${own ? "purple" : "teal"} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-[8px] text-white font-bold">
                        {name[0].toUpperCase()}
                      </span>
                    </div>
                    <div className={`max-w-[75%] ${own ? "text-right" : ""}`}>
                      <span
                        className={`text-[9px] font-bold ${own ? "text-violet-500" : "text-teal-500"}`}
                      >
                        {name}
                      </span>
                      <div
                        className={`text-xs mt-0.5 rounded-xl px-3 py-1.5 ${
                          own
                            ? "gradient-purple text-white"
                            : "neu-in text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {msg}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={sendMsg} className="flex gap-2">
              <input
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder={
                  online ? "Say something…" : "Start streaming to chat"
                }
                disabled={!online}
                className="flex-1 neu-in rounded-xl px-3 py-2.5 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 disabled:opacity-40 placeholder-slate-400"
              />
              <NeuButton
                variant="primary"
                className="!px-3 shrink-0"
                disabled={!online}
              >
                <Send size={14} />
              </NeuButton>
            </form>
          </NeuCard>
        </motion.div>
      </div>
    </div>
  );
}

export function AIAssistant() {
  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="AI Assistant"
        sub="Powered by Claude API — Your intelligent study companion"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:col-span-2 lg:col-span-3"
        >
          <NeuCard className="text-center py-12">
            <div className="gradient-purple w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(108,99,255,0.4)]">
              <Bot size={36} className="text-white" />
            </div>
            <h2 className="font-extrabold text-2xl text-slate-800 dark:text-slate-100 mb-2">
              AI Interview Coach
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Get real-time feedback on answers, adaptive mock interviews,
              resume analysis, and personalised study plans.
            </p>
            <span className="gradient-amber text-white rounded-xl px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2">
              <Clock size={14} /> Powered by Claude API — Coming in V2
            </span>
          </NeuCard>
        </motion.div>
        {[
          {
            icon: Mic,
            label: "AI Mock Interview",
            desc: "Adaptive questions based on your skill level and target role",
            gradient: "gradient-purple",
          },
          {
            icon: Lightbulb,
            label: "Smart Study Plan",
            desc: "AI analyses weak areas and creates a personalised daily plan",
            gradient: "gradient-amber",
          },
          {
            icon: MessageSquare,
            label: "Resume Feedback",
            desc: "Detailed ATS analysis and keyword optimisation suggestions",
            gradient: "gradient-teal",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
          >
            <NeuCard>
              <div
                className={`w-12 h-12 rounded-xl ${item.gradient} flex items-center justify-center mb-3`}
              >
                <item.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-1">
                {item.label}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {item.desc}
              </p>
              <span className="gradient-amber text-white text-[9px] font-bold px-2 py-1 rounded-lg">
                Coming in V2
              </span>
            </NeuCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
