"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { NeuCard, DiffBadge, TabBar, SectionHeader } from "../components/ui";
import { FRONTEND_QUESTIONS } from "../data/domains/frontend";
import { BACKEND_QUESTIONS } from "../data/domains/backend";
import { DSA_QUESTIONS } from "../data/domains/dsa";
import { DATABASE_QUESTIONS } from "../data/domains/database";
import { DEVOPS_QUESTIONS } from "../data/domains/devops";
import { SYSDESIGN_QUESTIONS } from "../data/domains/systemDesign";

const TABS = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "dsa", label: "DSA" },
  { id: "database", label: "Database" },
  { id: "devops", label: "DevOps" },
  { id: "sysdesign", label: "Sys Design" },
];

function QuestionCard({ q, i, withLeetcode }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
    >
      <NeuCard className="!p-0 overflow-hidden" hover={false}>
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">
              {withLeetcode ? `#${q.number} ` : ""}
              {q.title || q.q}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <DiffBadge diff={q.difficulty || q.diff} />
              <span className="text-[10px] text-slate-400">
                {q.tag || (q.tags && q.tags.join(" · "))}
              </span>
            </div>
          </div>
          {withLeetcode && (
            <button
              className="flex items-center gap-1 text-[10px] font-bold text-violet-500 neu-in px-2 py-1 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://leetcode.com/problems/${q.leetcode}`,
                  "_blank",
                );
              }}
            >
              <ExternalLink size={10} /> LeetCode
            </button>
          )}
          <div className="text-slate-400 flex-shrink-0">
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 neu-in mx-3 mb-3 rounded-xl">
                <p className="text-xs text-slate-400 pt-3 leading-relaxed">
                  {withLeetcode
                    ? `Click "LeetCode" to solve this problem. Track your solution and mark as solved in the Practice tab.`
                    : `Detailed answer and explanation coming in V2 — For now, research this topic and test your understanding.`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </NeuCard>
    </motion.div>
  );
}

function QuestionList({ questions, withLeetcode = false }) {
  return (
    <div className="space-y-2">
      {questions.map((q, i) => (
        <QuestionCard key={i} q={q} i={i} withLeetcode={withLeetcode} />
      ))}
      <NeuCard className="text-center !py-4">
        <p className="text-sm text-slate-400">
          Full question bank with detailed answers coming in{" "}
          <span className="text-violet-500 font-bold">V2</span>
        </p>
      </NeuCard>
    </div>
  );
}

const tabContent = {
  frontend: () => <QuestionList questions={FRONTEND_QUESTIONS} />,
  backend: () => <QuestionList questions={BACKEND_QUESTIONS} />,
  dsa: () => <QuestionList questions={DSA_QUESTIONS} withLeetcode />,
  database: () => <QuestionList questions={DATABASE_QUESTIONS} />,
  devops: () => <QuestionList questions={DEVOPS_QUESTIONS} />,
  sysdesign: () => <QuestionList questions={SYSDESIGN_QUESTIONS} />,
};

export default function Interview() {
  const [tab, setTab] = useState("frontend");
  const Content = tabContent[tab];

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Interview Prep"
        sub="Curated questions across all domains — click to expand"
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
          <Content />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
