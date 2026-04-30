"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Bot,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  Sparkles,
  Target,
  Key,
  Lightbulb,
  FileDown,
} from "lucide-react";
import {
  NeuCard,
  NeuButton,
  ProgressBar,
  SectionHeader,
} from "../components/ui";
import { api } from "../api/api";

const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

function DropZone({ file, onFile, dragging, setDragging }) {
  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (
        f &&
        (ACCEPTED.includes(f.type) ||
          f.name.endsWith(".pdf") ||
          f.name.endsWith(".docx"))
      ) {
        onFile(f);
      }
    },
    [onFile, setDragging],
  );

  return (
    <div
      className={`rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${dragging ? "neu-out scale-[1.01]" : "neu-in"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) onFile(e.target.files[0]);
        }}
      />
      {file ? (
        <>
          <CheckCircle2 size={28} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {file.name}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {(file.size / 1024).toFixed(0)} KB · Click to replace
          </p>
        </>
      ) : (
        <>
          <div className="gradient-indigo w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FileText size={24} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {dragging
              ? "Drop to upload!"
              : "Drop your resume or click to browse"}
          </p>
          <p className="text-xs text-slate-400 mt-1">PDF or DOCX · Max 5MB</p>
        </>
      )}
    </div>
  );
}

function ScoreRing({ score }) {
  const color =
    score >= 80
      ? "text-grad-green"
      : score >= 60
        ? "text-grad-amber"
        : "text-grad-pink";
  return (
    <div className="neu-in rounded-2xl p-6 text-center">
      <div className={`text-5xl font-extrabold font-display ${color}`}>
        {score}
      </div>
      <div className="text-xs text-slate-400 font-semibold mt-1">ATS Score</div>
      <ProgressBar
        value={score}
        color={
          score >= 80
            ? "gradient-green"
            : score >= 60
              ? "gradient-amber"
              : "gradient-pink"
        }
        className="mt-3"
      />
    </div>
  );
}

function KeywordPill({ word, matched }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
        matched
          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
          : "bg-red-100 dark:bg-red-900/20 text-red-500"
      }`}
    >
      {matched ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
      {word}
    </span>
  );
}

export default function Resume() {
  const [jd, setJd] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("analysis");
  const [downloading, setDownloading] = useState("");

  const canOptimize = jd.trim().length > 20 && file;

  const handleOptimize = async () => {
    if (!canOptimize) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const form = new FormData();
      form.append("jobDescription", jd);
      form.append("resume", file);

      const res = await api.postForm("/resume/optimize", form);
      const data = await res.json();
      setResult(data);
      setActiveTab("analysis");
    } catch (err) {
      setError(
        err.message ||
          "Optimization failed. Ensure the backend is running and ANTHROPIC_API_KEY is set.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    if (!result?.optimizedContent) return;
    setDownloading(format);
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("prodev-token")
          : null;
      const BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${BASE}/resume/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ content: result.optimizedContent, format }),
      });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `optimized_resume.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading("");
    }
  };

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <SectionHeader
        title="Resume Optimizer"
        sub="Paste a job description + upload your resume → AI rewrites it for ATS"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Job Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NeuCard hover={false}>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Target size={15} className="text-violet-500" /> Job Description
              <span className="text-[10px] text-slate-400 font-normal ml-auto">
                Required
              </span>
            </h3>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here…"
              rows={10}
              className="w-full neu-in rounded-xl px-4 py-3 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 resize-none placeholder-slate-400 leading-relaxed"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              {jd.length} chars · Minimum 20 required
            </p>
          </NeuCard>
        </motion.div>

        {/* Resume Upload */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <NeuCard hover={false}>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-4">
              <Upload size={15} className="text-indigo-500" /> Your Resume
              <span className="text-[10px] text-slate-400 font-normal ml-auto">
                Required
              </span>
            </h3>
            <DropZone
              file={file}
              onFile={setFile}
              dragging={dragging}
              setDragging={setDragging}
            />
            {file && (
              <button
                onClick={() => setFile(null)}
                className="mt-2 text-[11px] text-red-400 hover:text-red-600 cursor-pointer border-0 bg-transparent w-full text-center"
              >
                Remove file
              </button>
            )}
            <div className="mt-5 neu-in rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Bot size={13} className="text-violet-500" /> What the AI does
              </p>
              <ul className="space-y-1.5">
                {[
                  "Extracts key skills & requirements from the JD",
                  "Scores your resume against ATS criteria (0-100)",
                  "Identifies matched & missing keywords",
                  "Rewrites your resume to maximize keyword density",
                  "Generates downloadable PDF + DOCX",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] text-slate-400"
                  >
                    <CheckCircle2
                      size={11}
                      className="text-emerald-500 mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </NeuCard>
        </motion.div>
      </div>

      {/* Optimize Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4"
      >
        <NeuButton
          variant="primary"
          className="w-full !py-4 text-base gap-2"
          disabled={!canOptimize || loading}
          onClick={handleOptimize}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing & Optimizing…
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Analyze & Optimize Resume
            </>
          )}
        </NeuButton>
        {!canOptimize && !loading && (
          <p className="text-center text-xs text-slate-400 mt-2">
            {!jd.trim()
              ? "Add a job description to continue"
              : !file
                ? "Upload your resume to continue"
                : ""}
          </p>
        )}
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl px-4 py-3 text-sm"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            {/* Tab bar */}
            <div className="flex gap-1 neu-in rounded-xl p-1 mb-4">
              {[
                { id: "analysis", label: "Analysis" },
                { id: "optimized", label: "Optimized Resume" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
                    activeTab === t.id
                      ? "neu-out bg-(--neu-bg) text-violet-500"
                      : "bg-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === "analysis" && (
              <div className="space-y-4">
                {/* Score + keyword summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ScoreRing score={result.atsScore ?? 0} />
                  <NeuCard className="sm:col-span-2" hover={false}>
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-3">
                      <Key size={14} className="text-violet-500" /> Keywords
                    </h4>
                    <div className="mb-3">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
                        Matched ({result.matchedKeywords?.length ?? 0})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(result.matchedKeywords || []).map((k) => (
                          <KeywordPill key={k} word={k} matched />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1.5">
                        Missing ({result.missingKeywords?.length ?? 0})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(result.missingKeywords || []).map((k) => (
                          <KeywordPill key={k} word={k} matched={false} />
                        ))}
                      </div>
                    </div>
                  </NeuCard>
                </div>

                {/* Suggestions */}
                {result.suggestions?.length > 0 && (
                  <NeuCard hover={false}>
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-3">
                      <Lightbulb size={14} className="text-amber-500" /> AI
                      Suggestions
                    </h4>
                    <div className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 neu-in rounded-xl px-3 py-2.5"
                        >
                          {s.type === "critical" ? (
                            <AlertCircle
                              size={14}
                              className="text-red-400 mt-0.5 shrink-0"
                            />
                          ) : s.type === "improvement" ? (
                            <AlertCircle
                              size={14}
                              className="text-amber-400 mt-0.5 shrink-0"
                            />
                          ) : (
                            <CheckCircle2
                              size={14}
                              className="text-blue-400 mt-0.5 shrink-0"
                            />
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {s.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </NeuCard>
                )}

                {/* Download */}
                <NeuCard hover={false}>
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-3">
                    <FileDown size={14} className="text-violet-500" /> Download
                    Optimized Resume
                  </h4>
                  <div className="flex gap-3">
                    <NeuButton
                      variant="primary"
                      className="flex-1"
                      disabled={!!downloading}
                      onClick={() => handleDownload("pdf")}
                    >
                      {downloading === "pdf" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      Download PDF
                    </NeuButton>
                    <NeuButton
                      className="flex-1"
                      disabled={!!downloading}
                      onClick={() => handleDownload("docx")}
                    >
                      {downloading === "docx" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      Download DOCX
                    </NeuButton>
                  </div>
                </NeuCard>
              </div>
            )}

            {activeTab === "optimized" && (
              <NeuCard hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Bot size={14} className="text-violet-500" /> Optimized
                    Resume
                  </h4>
                  <div className="flex gap-2">
                    <NeuButton
                      variant="primary"
                      className="!py-1.5 !px-3 !text-xs"
                      disabled={!!downloading}
                      onClick={() => handleDownload("pdf")}
                    >
                      {downloading === "pdf" ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Download size={12} />
                      )}
                      PDF
                    </NeuButton>
                    <NeuButton
                      className="!py-1.5 !px-3 !text-xs"
                      disabled={!!downloading}
                      onClick={() => handleDownload("docx")}
                    >
                      {downloading === "docx" ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Download size={12} />
                      )}
                      DOCX
                    </NeuButton>
                  </div>
                </div>
                <pre className="neu-in rounded-xl p-4 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-mono overflow-auto max-h-[500px]">
                  {result.optimizedContent}
                </pre>
              </NeuCard>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
