import { useCallback, useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import FocusMode from "./pages/FocusMode.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Premium from "./pages/Premium.jsx";
import AboutDeveloper from "./pages/AboutDeveloper.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { getCurrentUser, getSettings, saveSettings, setCurrentUser, logoutUser } from "./utils/storage.js";
import { applyTheme } from "./utils/themes.js";

export default function App() {
  const [email, setEmail] = useState(() => getCurrentUser());
  const [page, setPage] = useState("dashboard");
  const [settings, setSettings] = useState(() => getSettings(getCurrentUser()));
  const user = useMemo(() => email ? { email, name: email === "guest@focusflow.local" ? "Guest Explorer" : email.split("@")[0].replace(/[._-]/g," ").replace(/\b\w/g,c=>c.toUpperCase()), isGuest: email === "guest@focusflow.local" } : null, [email]);

  useEffect(() => { if (email) { const next = getSettings(email); setSettings(next); applyTheme(next.palette, next.mode); } }, [email]);
  useEffect(() => { const onSystem = () => applyTheme(settings.palette, settings.mode); const mq = window.matchMedia?.("(prefers-color-scheme: dark)"); mq?.addEventListener?.("change", onSystem); return () => mq?.removeEventListener?.("change", onSystem); }, [settings.palette, settings.mode]);
  useEffect(() => { document.title = page === "dashboard" ? "FocusFlow — Productivity OS" : `FocusFlow — ${page[0].toUpperCase()}${page.slice(1)}`; }, [page]);
  useEffect(() => { const premiumHandler = () => setPage("premium"); const focusHandler = () => setPage("focus"); window.addEventListener("focusflow-open-premium", premiumHandler); window.addEventListener("focusflow-navigate-focus", focusHandler); return () => { window.removeEventListener("focusflow-open-premium", premiumHandler); window.removeEventListener("focusflow-navigate-focus", focusHandler); }; }, []);

  const navigate = useCallback((next) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const handleLogin = useCallback((loggedInUser) => { const nextEmail = typeof loggedInUser === "string" ? loggedInUser : loggedInUser.email; setCurrentUser(nextEmail); setEmail(nextEmail); setSettings(getSettings(nextEmail)); setPage("dashboard"); }, []);
  const handleLogout = useCallback(() => { logoutUser(); setEmail(null); setPage("dashboard"); }, []);
  const updateSettings = useCallback((patch) => { setSettings(current => { const next = { ...current, ...patch }; saveSettings(email, next); applyTheme(next.palette, next.mode); return next; }); }, [email]);

  if (!user) return <Login onLogin={handleLogin} />;

  const shared = { user, settings, onNavigate: navigate, onLogout: handleLogout, onPremium: () => navigate("premium"), onAddTask: () => window.dispatchEvent(new CustomEvent("focusflow-open-task")) };
  let content;
  if (page === "focus") content = <FocusMode onBack={() => navigate("dashboard")} onComplete={(id) => { window.dispatchEvent(new CustomEvent("focusflow-task-complete", { detail: { id } })); }} onAddTask={() => window.dispatchEvent(new CustomEvent("focusflow-open-task"))} />;
  else if (page === "settings") content = <Settings settings={settings} setSettings={updateSettings} onPremium={() => navigate("premium")} />;
  else if (page === "premium") content = <Premium user={user} settings={settings} setSettings={updateSettings} onBack={() => navigate("dashboard")} />;
  else if (page === "about") content = <AboutDeveloper user={user} settings={settings} />;
  else content = <Dashboard user={user} settings={settings} setSettings={updateSettings} showAllTasks={page === "tasks"} />;

  return <div className="min-h-screen bg-[var(--ff-bg)] text-[var(--ff-text)]"><Sidebar activePage={page} onNavigate={navigate} onLogout={handleLogout} settings={settings} /><div className="min-w-0 lg:ml-[274px]"><Header {...shared} /><main className="ff-page-enter min-h-[calc(100vh-72px)]">{content}</main></div></div>;
}
