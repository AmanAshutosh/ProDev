import { motion } from "framer-motion";
import { Trophy, Flame, Clock, Code2, Award, CheckCircle2 } from "lucide-react";
import { NeuCard, ProgressBar, SectionHeader } from "../components/ui";
import Heatmap from "../components/Heatmap";
import { ACHIEVEMENTS, PRACTICE_DOMAINS } from "../data/appData";
import { useProgress } from "../context/ProgressContext";
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PIE_COLORS = [
  "#6c63ff",
  "#38b2ac",
  "#f7971e",
  "#ff6584",
  "#764ba2",
  "#43e97b",
];
const ICON_MAP = { Flame, Clock, Code2, Award };

const TOOLTIP_STYLE = {
  background: "var(--neu-bg)",
  border: "none",
  borderRadius: 12,
  boxShadow: "var(--neu-shadow-out)",
  fontSize: 11,
};

export default function Progress() {
  const { getDomainPercentage, getActivityDates, getWeeklyActivity } = useProgress();

  const activityDates = getActivityDates();
  const weekData      = getWeeklyActivity();

  const radarData = PRACTICE_DOMAINS.map((d) => ({
    subject: d.label.split(" ")[0],
    A: getDomainPercentage(d.id),
  }));

  const pieData = PRACTICE_DOMAINS.map((d) => ({
    name: d.label.split(" ")[0],
    value: getDomainPercentage(d.id) || 1,
  }));

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Progress Analytics"
        sub="Your learning journey at a glance"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-4">
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="gh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c63ff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6c63ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [v, "Topics Completed"]} />
                <Area type="monotone" dataKey="topics" stroke="#6c63ff" strokeWidth={2} fill="url(#gh)" name="Topics" />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </NeuCard>
        </motion.div>

        {/* Skills Radar — live from ProgressContext */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-4">
              Skills Radar
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(128,128,128,0.2)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                <Radar
                  name="Progress"
                  dataKey="A"
                  stroke="#6c63ff"
                  fill="#6c63ff"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v) => [`${v}%`, "Progress"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </NeuCard>
        </motion.div>

        {/* Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-4">
              Progress Distribution
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v) => [`${v}%`, ""]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </NeuCard>
        </motion.div>

        {/* Domain Progress — live */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-4">
              Domain Progress
            </h3>
            <div className="space-y-4">
              {PRACTICE_DOMAINS.map((d, i) => {
                const pct = getDomainPercentage(d.id);
                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {d.label}
                      </span>
                      <span className={`font-bold ${d.textGrad}`}>{pct}%</span>
                    </div>
                    <ProgressBar value={pct} color={d.gradient} />
                  </motion.div>
                );
              })}
            </div>
          </NeuCard>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Trophy size={16} className="text-amber-400" /> Achievements
            </h3>
            <div className="space-y-2.5">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = ICON_MAP[a.icon] || Trophy;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-center gap-3 neu-in rounded-xl px-3 py-2.5"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${a.gradient} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {a.label}
                      </p>
                      <p className="text-[10px] text-slate-400">{a.desc}</p>
                    </div>
                    {a.done ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <span className="text-[10px] font-bold text-violet-500 neu-in px-2 py-0.5 rounded-md">
                        {a.progress}/{a.max}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </NeuCard>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-3">
              6-Month Activity
            </h3>
            <Heatmap weeks={26} compact activityDates={activityDates} />
          </NeuCard>
        </motion.div>
      </div>
    </div>
  );
}
