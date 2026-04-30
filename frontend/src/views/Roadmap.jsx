"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  Lock,
  ExternalLink,
  Globe,
  Layers,
  Server,
  Cloud,
} from "lucide-react";
import {
  NeuCard,
  NeuButton,
  ProgressBar,
  TabBar,
  SectionHeader,
} from "../components/ui";
import { ROADMAP_STAGES, ROADMAP_EXTERNAL } from "../data/appData";
import { useProgress } from "../context/ProgressContext";

const ICON_MAP = { Globe, Layers, Server, Cloud };

const TABS = [
  { id: "tracker", label: "My Progress" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
];

const ROADMAP_URLS = {
  fullstack: "https://roadmap.sh/full-stack",
  frontend: "https://roadmap.sh/frontend",
  backend: "https://roadmap.sh/backend",
  devops: "https://roadmap.sh/devops",
};

// Map ROADMAP_STAGES ids to practice domain ids
const STAGE_DOMAIN_MAP = {
  frontend: "frontend",
  backend: "backend",
  database: "database",
  devops: "devops",
  sysdesign: "sysdesign",
};

function RoadmapEmbed({ url }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center py-20 z-10">
          <div className="gradient-purple w-12 h-12 rounded-xl flex items-center justify-center mb-3 animate-pulse">
            <Globe size={22} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Loading roadmap.sh…
          </p>
        </div>
      )}
      <div
        className={`neu-in rounded-2xl overflow-hidden transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <iframe
          src={url}
          title="roadmap.sh"
          className="w-full"
          style={{ height: "680px", border: "none" }}
          onLoad={() => setLoading(false)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      {loading && <div className="h-96 neu-in rounded-2xl" />}
      <div className="mt-3 flex items-center justify-between neu-in rounded-xl px-4 py-2.5">
        <span className="text-xs text-slate-400">Powered by roadmap.sh</span>
        <NeuButton
          className="py-1! px-3! text-[11px]!"
          onClick={() => window.open(url, "_blank")}
        >
          <ExternalLink size={11} /> Open Full Screen
        </NeuButton>
      </div>
    </div>
  );
}

function NodeBadge({ node }) {
  const styles = {
    done: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 neu-in",
    active: "gradient-purple text-white shadow-md",
    pending: "neu-in text-slate-400",
  };
  const icons = {
    done: <CheckCircle2 size={11} />,
    active: <Flame size={11} />,
    pending: <Lock size={11} />,
  };
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${styles[node.status]}`}
    >
      {icons[node.status]}
      {node.label}
    </motion.span>
  );
}

function ProgressTracker() {
  const { getDomainPercentage } = useProgress();

  // Build stages with real percentages where available
  const stages = ROADMAP_STAGES.map((stage) => {
    const domainId = STAGE_DOMAIN_MAP[stage.id];
    const realPct = domainId ? getDomainPercentage(domainId) : stage.progress;
    return { ...stage, progress: realPct };
  });

  const total = stages.reduce((s, st) => s + st.nodes.length, 0);
  const done = stages.reduce(
    (s, st) => s + st.nodes.filter((n) => n.status === "done").length,
    0,
  );
  const active = stages.reduce(
    (s, st) => s + st.nodes.filter((n) => n.status === "active").length,
    0,
  );
  const overallPct = Math.round(
    stages.reduce((s, st) => s + st.progress, 0) / stages.length,
  );

  return (
    <div>
      <NeuCard className="mb-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-display font-extrabold text-grad-green">
              {done}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">
              Topics Done
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-extrabold text-grad-purple">
              {active}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">
              In Progress
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-extrabold text-grad-amber">
              {total - done - active}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">
              Remaining
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Overall Completion</span>
            <span className="font-bold text-violet-500">{overallPct}%</span>
          </div>
          <ProgressBar value={overallPct} />
        </div>
      </NeuCard>

      <div className="space-y-4">
        {stages.map((stage, i) => {
          const Icon = ICON_MAP[stage.icon] || Globe;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <NeuCard className="relative overflow-hidden">
                <div className="absolute top-3 right-4 font-display font-extrabold text-5xl opacity-[0.04] leading-none select-none">
                  {stage.num}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stage.gradient} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={19} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-slate-700 dark:text-slate-200">
                      {stage.label}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {stage.sub}
                    </div>
                  </div>
                  <span
                    className="font-bold text-xs"
                    style={{
                      color: stage.progress >= 100 ? "#27ae60" : "#6c63ff",
                    }}
                  >
                    {stage.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={stage.progress}
                  color={stage.gradient}
                  className="mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {stage.nodes.map((node, j) => (
                    <NodeBadge key={j} node={node} />
                  ))}
                </div>
              </NeuCard>
            </motion.div>
          );
        })}
      </div>

      <NeuCard className="mt-4 text-center py-5!">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
          View full interactive roadmaps on roadmap.sh
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {ROADMAP_EXTERNAL.map((r) => (
            <NeuButton
              key={r.label}
              className="text-[11px]!"
              onClick={() => window.open(r.url, "_blank")}
            >
              <ExternalLink size={12} /> {r.label}
            </NeuButton>
          ))}
        </div>
      </NeuCard>
    </div>
  );
}

export default function Roadmap() {
  const [tab, setTab] = useState("tracker");

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Learning Roadmap"
        sub="Track your real progress · Explore interactive roadmap.sh paths"
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "tracker" ? (
            <ProgressTracker />
          ) : (
            <RoadmapEmbed url={ROADMAP_URLS[tab]} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
