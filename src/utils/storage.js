const USERS_KEY = "focusflow_users";
const SESSION_KEY = "focusflow_session";
const GUEST_EMAIL = "guest@focusflow.local";

const defaultSettings = {
  palette: "mono",
  mode: "system",
  notifications: false,
  reminderMinutes: 15,
  premiumUnlocked: false,
};

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function keyFor(prefix, email) {
  return email === GUEST_EMAIL ? `focusflow_guest_${prefix}` : `focusflow_${prefix}_${email}`;
}

export function getUsers() { return safeParse(localStorage.getItem(USERS_KEY), []); }
export function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
export function getCurrentUser() { return localStorage.getItem(SESSION_KEY); }
export function setCurrentUser(email) { if (email) localStorage.setItem(SESSION_KEY, email); }
export function logoutUser() { localStorage.removeItem(SESSION_KEY); localStorage.removeItem("focusflow_guest_active"); }

export function getTasks(email) { return safeParse(localStorage.getItem(keyFor("tasks", email)), []); }
export function saveTasks(email, tasks) { if (email) localStorage.setItem(keyFor("tasks", email), JSON.stringify(tasks)); }

export function getSettings(email) {
  const saved = safeParse(localStorage.getItem(keyFor("settings", email)), {});
  return { ...defaultSettings, ...saved, mode: saved.mode || (saved.theme === "light" || saved.theme === "dark" ? saved.theme : "system") };
}

export function saveSettings(email, settings) {
  if (!email) return;
  localStorage.setItem(keyFor("settings", email), JSON.stringify({ ...defaultSettings, ...settings }));
}

export function markTutorialSeen(email) {
  localStorage.setItem(email === GUEST_EMAIL ? "focusflow_guest_tutorial" : "focusflow_tutorial", "completed");
}

export function hasSeenTutorial(email) {
  return localStorage.getItem(email === GUEST_EMAIL ? "focusflow_guest_tutorial" : "focusflow_tutorial") === "completed";
}
