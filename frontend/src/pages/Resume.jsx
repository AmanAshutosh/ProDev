import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Eye,
  RotateCcw,
  Bot,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  NeuCard,
  NeuButton,
  ProgressBar,
  SectionHeader,
} from "../components/ui";

const VERSIONS = [
  {
    name: "Resume_v3_latest.pdf",
    date: "2 days ago",
    size: "425KB",
    current: true,
    color: "gradient-green",
  },
  {
    name: "Resume_v2.pdf",
    date: "1 week ago",
    size: "402KB",
    current: false,
    color: "gradient-teal",
  },
  {
    name: "Resume_v1.pdf",
    date: "1 month ago",
    size: "390KB",
    current: false,
    color: "gradient-pink",
  },
];

const AI_SUGGESTIONS = [
  {
    type: "warn",
    text: 'Add quantifiable achievements (e.g., "Improved performance by 40%")',
  },
  { type: "warn", text: "Missing keywords: Kubernetes, CI/CD, System Design" },
  { type: "info", text: "Add a Projects section with GitHub links" },
];

export default function Resume() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") setUploaded(true);
  }, []);

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Resume Manager"
        sub="Upload, track versions, and get AI-powered feedback"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upload area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Upload size={16} className="text-indigo-500" /> Upload Resume
            </h3>
            <div
              className={`rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragging ? "neu-out scale-[1.01]" : "neu-in"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => setUploaded(true)}
            >
              <div className="gradient-indigo w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText size={24} className="text-white" />
              </div>
              {uploaded ? (
                <>
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 mx-auto mb-2"
                  />
                  <p className="text-sm font-semibold text-emerald-600">
                    Resume_v3_latest.pdf uploaded!
                  </p>
                  <p className="text-xs text-slate-400 mt-1">425KB · PDF</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {dragging
                      ? "Drop to upload!"
                      : "Drop your PDF here or click"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, DOC · Max 5MB
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <NeuButton
                variant="primary"
                className="flex-1"
                onClick={() => setUploaded(true)}
              >
                <Upload size={13} /> Browse Files
              </NeuButton>
              <NeuButton className="flex-1">
                <Eye size={13} /> Preview
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>

        {/* Version history */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NeuCard>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <RotateCcw size={16} className="text-violet-500" /> Version
              History
            </h3>
            <div className="space-y-2.5">
              {VERSIONS.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 neu-in rounded-xl px-3 py-2.5"
                >
                  <div
                    className={`w-9 h-9 rounded-xl ${v.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                      {v.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {v.date} · {v.size}
                    </p>
                  </div>
                  {v.current ? (
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-md">
                      Current
                    </span>
                  ) : (
                    <button className="text-[11px] text-violet-500 font-semibold cursor-pointer border-0 bg-transparent">
                      Restore
                    </button>
                  )}
                  <Download
                    size={13}
                    className="text-slate-300 cursor-pointer hover:text-violet-500 transition-colors"
                  />
                </motion.div>
              ))}
            </div>
          </NeuCard>
        </motion.div>

        {/* AI Analyzer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <NeuCard>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Bot size={16} className="text-violet-500" /> AI Resume Analyzer
              </h3>
              <span className="gradient-amber text-white text-[9px] font-bold px-2 py-1 rounded-lg">
                V2 Feature
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { val: "82", label: "ATS Score", grad: "text-grad-green" },
                {
                  val: "12",
                  label: "Keywords Matched",
                  grad: "text-grad-amber",
                },
                { val: "3", label: "Suggestions", grad: "text-grad-pink" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="neu-in rounded-xl text-center py-4"
                >
                  <div
                    className={`text-3xl font-display font-extrabold ${s.grad}`}
                  >
                    {s.val}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Resume Strength</span>
                <span className="font-bold text-violet-500">82%</span>
              </div>
              <ProgressBar value={82} />
            </div>

            <div className="space-y-2">
              {AI_SUGGESTIONS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 neu-in rounded-xl px-3 py-2.5"
                >
                  {s.type === "warn" ? (
                    <AlertCircle
                      size={14}
                      className="text-amber-500 mt-0.5 flex-shrink-0"
                    />
                  ) : (
                    <CheckCircle2
                      size={14}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <NeuButton
                variant="primary"
                className="flex-1"
                onClick={() => alert("Full AI analysis available in V2!")}
              >
                <Bot size={13} /> Run Full Analysis
              </NeuButton>
              <NeuButton className="flex-1">
                <Download size={13} /> Export Report
              </NeuButton>
            </div>
          </NeuCard>
        </motion.div>
      </div>
    </div>
  );
}
