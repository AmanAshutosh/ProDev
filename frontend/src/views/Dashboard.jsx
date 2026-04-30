"use client";
import { motion } from "framer-motion";
import {
  Flame,
  Clock,
  Code2,
  CheckCircle2,
  FileText,
  Map,
  Tv2,
  ChevronRight,
  Play,
  Server,
  GitBranch,
  Database,
  Cloud,
  Network,
  Mic,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  NeuCard,
  ProgressBar,
  NeuButton,
  LiveBadge,
  SectionHeader,
} from "../components/ui";
import Heatmap from "../components/Heatmap";
import { PRACTICE_DOMAINS } from "../data/appData";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const ICON_MAP = { Code2, Server, GitBranch, Database, Cloud, Network };

const INTERVIEW_CATS = [
  {
    label: "Frontend (HTML, CSS, JS, React)",
    count: 12,
    color:
      "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    icon: Code2,
  },
  {
    label: "Backend (Node, APIs)",
    count: 8,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    icon: Server,
  },
  {
    label: "DSA (Arrays, Trees, DP)",
    count: 15,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    icon: GitBranch,
  },
  {
    label: 'System Design ("The Glue")',
    count: 7,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: Network,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

function StatPill({ value, label, textClass }) {
  return (
    <div className="flex-1 neu-in rounded-xl py-2.5 text-center">
      <div className={`text-lg font-display font-extrabold ${textClass}`}>
        {value}
      </div>
      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
        {label}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { getDomainPercentage, getActivityDates, getWeeklyActivity } =
    useProgress();

  const activityDates = getActivityDates();
  const weeklyData = getWeeklyActivity();
  const chartData = weeklyData.map((d) => ({
    day: d.day.charAt(0),
    h: d.topics,
  }));

  const overallProgress = Math.round(
    PRACTICE_DOMAINS.reduce((sum, d) => sum + getDomainPercentage(d.id), 0) /
      PRACTICE_DOMAINS.length,
  );

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const contributions = activityDates.filter(
    (d) => new Date(d) >= sixMonthsAgo,
  ).length;

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = activityDates.filter((d) => d.startsWith(todayStr)).length;

  const avatarSrc =
    user?.avatar ||
    `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(user?.email || "prodev")}&backgroundColor=b6e3f4`;

  const roadmapItems = PRACTICE_DOMAINS.slice(0, 5).map((d) => {
    const pct = getDomainPercentage(d.id);
    return {
      label: d.label,
      pct,
      status: pct >= 100 ? "done" : pct > 0 ? "active" : "pending",
    };
  });

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title={
          user ? `Welcome back, ${user.name}! 👋` : "Welcome to ProDev! 👋"
        }
        sub={
          user
            ? `You're on a ${user.streak || 0}-day streak. Keep it going!`
            : "Sign in to track your progress."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* PROFILE CARD */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <NeuCard className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <img
                src={avatarSrc}
                alt="avatar"
                className="w-16 h-16 rounded-full neu-out"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=prodev&backgroundColor=b6e3f4`;
                }}
              />
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--neu-bg)]" />
            </div>
            <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-base">
              {user?.name || "—"}
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              {user?.bio ||
                (user ? "Developer" : "Sign in to see your profile")}{" "}
              · LvL {user?.level ?? "—"}
            </p>
            <div className="flex gap-2 mb-4">
              <StatPill
                value={user?.problemsSolved ?? 0}
                label="Problems"
                textClass="text-grad-purple"
              />
              <StatPill
                value={user?.totalHours ?? 0}
                label="Hours"
                textClass="text-grad-amber"
              />
              <StatPill
                value={`${user?.streak ?? 0}🔥`}
                label="Streak"
                textClass="text-grad-green"
              />
            </div>
            <div className="text-xs flex justify-between text-slate-400 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-bold text-violet-500">
                {overallProgress}%
              </span>
            </div>
            <ProgressBar value={overallProgress} />
          </NeuCard>
        </motion.div>

        {/* STREAK + MINI CHART */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <NeuCard>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl font-display font-extrabold text-grad-amber leading-none">
                  {user?.streak ?? 0}
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
                  <Flame size={13} className="text-amber-400" /> Day Streak
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 mb-1">This week</div>
                <ResponsiveContainer width={120} height={52}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#6c63ff"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="#6c63ff"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="h"
                      stroke="#6c63ff"
                      strokeWidth={2}
                      fill="url(#wg)"
                      dot={false}
                    />
                    <Tooltip contentStyle={{ display: "none" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="neu-in rounded-xl text-center py-3">
                <div className="text-xl font-display font-extrabold text-grad-pink leading-none">
                  {todayCount}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Today's Topics
                </div>
              </div>
              <div className="neu-in rounded-xl text-center py-3">
                <div className="text-xl font-display font-extrabold text-grad-teal leading-none">
                  {user?.xp ?? 0}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Total XP
                </div>
              </div>
            </div>
          </NeuCard>
        </motion.div>

        {/* HEATMAP */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="lg:col-span-3 sm:col-span-2"
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                  Activity Heatmap
                </h3>
                <p className="text-[11px] text-slate-400">
                  {contributions} contribution{contributions !== 1 ? "s" : ""}{" "}
                  in the last 6 months
                </p>
              </div>
            </div>
            <Heatmap weeks={26} compact activityDates={activityDates} />
          </NeuCard>
        </motion.div>

        {/* PRACTICE DOMAIN CARDS */}
        {PRACTICE_DOMAINS.map((d, i) => {
          const Icon = ICON_MAP[d.icon] || Code2;
          const pct = getDomainPercentage(d.id);
          return (
            <motion.div
              key={d.id}
              custom={i + 3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <NeuCard>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${d.gradient} flex items-center justify-center flex-shrink-0`}
                    style={{ boxShadow: `0 4px 12px ${d.shadow}` }}
                  >
                    <Icon size={19} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                      {d.label}
                    </div>
                    <div className="text-[11px] text-slate-400">{d.sub}</div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Progress</span>
                  <span className={`font-bold ${d.textGrad}`}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color={d.gradient} className="mb-3" />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {d.topics.map((t, ti) => (
                    <span
                      key={ti}
                      className={`text-[10px] font-semibold neu-in px-2 py-0.5 rounded-lg ${d.topicColors[ti] || ""}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <NeuButton
                  variant="primary"
                  className="w-full !rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${d.color}, ${d.color}dd)`,
                    boxShadow: `0 4px 12px ${d.shadow}`,
                  }}
                  onClick={() => router.push("/practice")}
                >
                  <Play size={13} /> Continue Learning
                </NeuButton>
              </NeuCard>
            </motion.div>
          );
        })}

        {/* INTERVIEW PREP */}
        <motion.div
          custom={9}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="sm:col-span-2"
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
                  <Mic size={16} className="text-violet-500" /> Interview Prep
                </h3>
                <p className="text-[11px] text-slate-400">
                  Practice curated questions by category
                </p>
              </div>
              <NeuButton
                variant="primary"
                className="!py-1.5 !text-[11px]"
                onClick={() => router.push("/interview")}
              >
                View All
              </NeuButton>
            </div>
            <div className="space-y-2">
              {INTERVIEW_CATS.map((cat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 neu-in rounded-xl px-3 py-2.5 cursor-pointer"
                  onClick={() => router.push("/interview")}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}
                  >
                    <cat.icon size={15} />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300 flex-1">
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {cat.count} Qs
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                </motion.div>
              ))}
            </div>
          </NeuCard>
        </motion.div>

        {/* RESUME */}
        <motion.div
          custom={10}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <NeuCard>
            <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2 mb-3">
              <FileText size={16} className="text-indigo-500" /> Resume
            </h3>
            <div
              className="neu-in rounded-xl p-5 text-center mb-3 cursor-pointer hover:neu-out transition-all duration-200"
              onClick={() => router.push("/resume")}
            >
              <div className="gradient-indigo w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                <FileText size={20} className="text-white" />
              </div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Upload Resume
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                PDF, DOC · Max 5MB
              </div>
            </div>
            <div className="flex gap-2">
              <NeuButton
                variant="primary"
                className="flex-1 !text-[11px]"
                onClick={() => router.push("/resume")}
              >
                View
              </NeuButton>
              <NeuButton
                className="flex-1 !text-[11px]"
                onClick={() => router.push("/resume")}
              >
                Export
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>

        {/* ROADMAP MINI */}
        <motion.div
          custom={11}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="sm:col-span-2"
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <Map size={16} className="text-emerald-500" /> Learning Roadmap
              </h3>
              <NeuButton
                variant="primary"
                className="!py-1.5 !text-[11px]"
                onClick={() => router.push("/roadmap")}
              >
                Full Map
              </NeuButton>
            </div>
            <div className="space-y-2">
              {roadmapItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.status === "done"
                        ? "gradient-green"
                        : item.status === "active"
                          ? "gradient-purple"
                          : "neu-in"
                    }`}
                  >
                    {item.status === "done" ? (
                      <CheckCircle2 size={14} className="text-white" />
                    ) : item.status === "active" ? (
                      <Flame size={13} className="text-white" />
                    ) : (
                      <Clock size={12} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                      {item.label}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      item.status === "done"
                        ? "text-emerald-500"
                        : item.status === "active"
                          ? "text-violet-500"
                          : "text-slate-400"
                    }`}
                  >
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </NeuCard>
        </motion.div>

        {/* LIVE STREAM */}
        <motion.div
          custom={12}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <Tv2 size={16} className="text-red-500" /> Live Stream
              </h3>
              <LiveBadge online={false} />
            </div>
            <div className="neu-in rounded-xl p-4 text-center mb-3">
              <Tv2 size={32} className="text-red-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Stream to YouTube
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                RTMP · OBS · 1080p
              </div>
            </div>
            <div className="flex gap-2">
              <NeuButton
                variant="primary"
                className="flex-1 !text-[11px]"
                style={{
                  background: "linear-gradient(135deg,#ff4757,#ff6b81)",
                }}
                onClick={() => router.push("/livestream")}
              >
                Go Live
              </NeuButton>
              <NeuButton
                className="flex-1 !text-[11px]"
                onClick={() => router.push("/livestream")}
              >
                Setup
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>
      </div>
    </div>
  );
}
