export const GUEST_USER = { id: "focusflow-guest", name: "Guest Explorer", email: "guest@focusflow.local", isGuest: true };

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export const guestTasks = [
  { id: "guest-task-1", title: "Complete DBMS assignment", description: "Finish SQL queries, normalization and transaction questions.", dueDate: getDateOffset(1), importance: "High", urgency: "High", effort: "Medium", completed: false, createdAt: Date.now() - 18000000 },
  { id: "guest-task-2", title: "Update GitHub README", description: "Add project screenshots, features and setup instructions.", dueDate: getDateOffset(2), importance: "Medium", urgency: "Medium", effort: "Low", completed: false, createdAt: Date.now() - 28800000 },
  { id: "guest-task-3", title: "Prepare for tomorrow's exam", description: "Revise transportation problems and optimization methods.", dueDate: getDateOffset(0), importance: "High", urgency: "High", effort: "High", completed: false, createdAt: Date.now() - 7200000 },
  { id: "guest-task-4", title: "Apply for software internship", description: "Find suitable internships and submit two applications.", dueDate: getDateOffset(5), importance: "High", urgency: "Low", effort: "Medium", completed: false, createdAt: Date.now() - 43200000 },
  { id: "guest-task-5", title: "Clean up project code", description: "Remove unused components and improve folder structure.", dueDate: getDateOffset(7), importance: "Low", urgency: "Low", effort: "Medium", completed: false, createdAt: Date.now() - 64800000 },
];

export function createGuestSession() {
  const tasks = guestTasks.map((task) => ({ ...task, id: `guest-${Date.now()}-${task.id}` }));
  const settings = { palette: "mono", mode: "system", notifications: true, reminderMinutes: 15, premiumUnlocked: false };
  localStorage.setItem("focusflow_guest_tasks", JSON.stringify(tasks));
  localStorage.setItem("focusflow_guest_settings", JSON.stringify(settings));
  localStorage.setItem("focusflow_guest_active", "true");
  return { user: { ...GUEST_USER, sessionStartedAt: Date.now() }, tasks, settings };
}

export function clearGuestSession() {
  localStorage.removeItem("focusflow_guest_tasks");
  localStorage.removeItem("focusflow_guest_settings");
  localStorage.removeItem("focusflow_guest_active");
}
