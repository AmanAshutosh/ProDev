"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  CheckCircle2,
  Code2,
  Server,
  GitBranch,
  Database,
  Cloud,
  Network,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  NeuCard,
  ProgressBar,
  NeuButton,
  DiffBadge,
  TabBar,
  SectionHeader,
} from "../components/ui";
import { PRACTICE_DOMAINS } from "../data/appData";
import { DSA_QUESTIONS } from "../data/domains/dsa";
import { useProgress } from "../context/ProgressContext";

const TABS = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "dsa", label: "DSA" },
  { id: "database", label: "Database" },
  { id: "devops", label: "DevOps" },
  { id: "sysdesign", label: "System Design" },
];

const ICON_MAP = { Code2, Server, GitBranch, Database, Cloud, Network };

// Groups topics by their 'group' field
function groupTopics(topics) {
  return topics.reduce((acc, t) => {
    if (!acc[t.group]) acc[t.group] = [];
    acc[t.group].push(t);
    return acc;
  }, {});
}

function TopicRow({ topic, completed, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 neu-in rounded-xl px-3 py-2.5 cursor-pointer hover:neu-out transition-all duration-200 group select-none ${completed ? "opacity-70" : ""}`}
      onClick={() => onToggle(topic.id, !completed)}
    >
      <div
        className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all duration-200 ${completed ? "gradient-green" : "neu-in"}`}
      >
        {completed && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <span
        className={`text-sm font-medium flex-1 transition-colors ${
          completed
            ? "line-through text-slate-400"
            : "text-slate-700 dark:text-slate-200 group-hover:text-violet-500"
        }`}
      >
        {topic.label}
      </span>
    </motion.div>
  );
}

function TopicGroup({ groupName, topics, domainId }) {
  const { getTopicStatus, markTopic } = useProgress();
  const [open, setOpen] = useState(true);
  const done = topics.filter((t) => getTopicStatus(domainId, t.id)).length;
  const total = topics.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between mb-2 cursor-pointer border-0 bg-transparent text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {groupName}
          </span>
          <span className="text-[10px] font-bold text-violet-500 neu-in px-2 py-0.5 rounded-md">
            {done}/{total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full gradient-purple rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {open ? (
            <ChevronUp size={14} className="text-slate-400" />
          ) : (
            <ChevronDown size={14} className="text-slate-400" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-1.5"
          >
            {topics.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <TopicRow
                  topic={t}
                  completed={getTopicStatus(domainId, t.id)}
                  onToggle={(id, v) => markTopic(domainId, id, v)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DomainTopics({ domainId }) {
  const { getDomainPercentage } = useProgress();
  const domain = PRACTICE_DOMAINS.find((d) => d.id === domainId);
  if (!domain?.allTopics) return null;

  const groups = groupTopics(domain.allTopics);
  const pct = getDomainPercentage(domainId);
  const total = domain.allTopics.length;
  const done = Math.round((pct / 100) * total);

  return (
    <div>
      {/* Domain header */}
      <NeuCard className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl ${domain.gradient} flex items-center justify-center shrink-0`}
          >
            {(() => {
              const Icon = ICON_MAP[domain.icon] || Code2;
              return <Icon size={19} className="text-white" />;
            })()}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-700 dark:text-slate-200">
              {domain.label}
            </div>
            <div className="text-xs text-slate-400">{domain.sub}</div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-extrabold ${domain.textGrad}`}>
              {pct}%
            </div>
            <div className="text-[10px] text-slate-400">
              {done}/{total} done
            </div>
          </div>
        </div>
        <ProgressBar value={pct} color={domain.gradient} />
      </NeuCard>

      {/* Topic groups */}
      {Object.entries(groups).map(([groupName, topics]) => (
        <TopicGroup
          key={groupName}
          groupName={groupName}
          topics={topics}
          domainId={domainId}
        />
      ))}
    </div>
  );
}

function DSATable() {
  const { getTopicStatus, markTopic } = useProgress();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">
            DSA Question Bank
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tap a question to open on LeetCode · Check to mark solved
          </p>
        </div>
        <span className="text-xs font-bold text-violet-500 neu-in px-3 py-1 rounded-lg">
          {
            DSA_QUESTIONS.filter((q) => getTopicStatus("dsa", `dsa-q-${q.id}`))
              .length
          }
          /{DSA_QUESTIONS.length} solved
        </span>
      </div>
      <div className="space-y-2">
        {DSA_QUESTIONS.map((q, i) => {
          const solved = getTopicStatus("dsa", `dsa-q-${q.id}`);
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025 }}
              className={`flex items-center gap-3 neu-in rounded-xl px-3 py-3 group ${solved ? "opacity-60" : ""}`}
            >
              <button
                className="w-5 h-5 rounded-md neu-in flex items-center justify-center shrink-0 cursor-pointer border-0 bg-transparent"
                onClick={() => markTopic("dsa", `dsa-q-${q.id}`, !solved)}
              >
                {solved && (
                  <CheckCircle2 size={13} className="text-emerald-500" />
                )}
              </button>
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://leetcode.com/problems/${q.leetcode}`,
                    "_blank",
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    #{q.number}
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors group-hover:text-violet-500 ${
                      solved
                        ? "line-through text-slate-400"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {q.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  {q.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <DiffBadge diff={q.difficulty} />
              <ExternalLink
                size={13}
                className="text-slate-300 group-hover:text-violet-400 transition-colors shrink-0 cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://leetcode.com/problems/${q.leetcode}`,
                    "_blank",
                  )
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Practice() {
  const [tab, setTab] = useState("frontend");

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Practice Hub"
        sub="Sharpen your skills — check off topics as you learn"
      />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "dsa" ? <DSATable /> : <DomainTopics domainId={tab} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
