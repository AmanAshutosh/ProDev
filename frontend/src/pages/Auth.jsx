import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { NeuCard, NeuButton } from "../components/ui";
import { useAuth } from "../context/AuthContext";

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightSlot,
}) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full neu-in rounded-xl pl-9 pr-10 py-3 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 placeholder-slate-400"
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPass, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await register(name, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--neu-bg)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 neu-out"
          >
            <Briefcase size={28} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-grad-purple">ProDev</h1>
          <p className="text-sm text-slate-400 mt-1">
            Your career, accelerated.
          </p>
        </div>

        <NeuCard>
          {/* Mode toggle */}
          <div className="flex neu-in rounded-xl p-1 mb-6">
            {[
              { key: "login", label: "Sign In" },
              { key: "register", label: "Sign Up" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setMode(key);
                  setError("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
                  mode === key
                    ? "neu-out bg-[var(--neu-bg)] text-violet-500"
                    : "bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Field
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Developer"
                    icon={User}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              icon={Mail}
            />

            <Field
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="text-slate-400 hover:text-violet-500 cursor-pointer border-0 bg-transparent transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl px-3 py-2.5 text-xs"
                >
                  <AlertCircle size={13} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <NeuButton
              variant="primary"
              className="w-full !py-3"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : "Creating account…"}
                </span>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </NeuButton>
          </form>
        </NeuCard>

        <p className="text-center text-xs text-slate-400 mt-5">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            className="text-violet-500 font-bold cursor-pointer border-0 bg-transparent hover:underline"
          >
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
