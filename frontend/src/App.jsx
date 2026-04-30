import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import TopLoader from "./components/TopLoader";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Roadmap from "./pages/Roadmap";
import Interview from "./pages/Interview";
import Resume from "./pages/Resume";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { Livestream, AIAssistant } from "./pages/Livestream";

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--neu-bg)] text-slate-700 dark:text-slate-200 transition-colors duration-300">
      <TopLoader />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/livestream" element={<Livestream />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ProgressProvider>
            <Layout />
          </ProgressProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
