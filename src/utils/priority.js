const IMPORTANCE = { Low: 30, Medium: 65, High: 100 };
const EFFORT = { Low: 100, Medium: 60, High: 30 };
const URGENCY = { Low: 30, Medium: 65, High: 100 };

export function calculatePriorityScore({ importance = "Medium", effort = "Medium", urgency = "Medium", dueDate }) {
  let due = URGENCY[urgency] ?? 65;
  if (dueDate) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dueAt = new Date(`${dueDate}T00:00:00`);
    const days = Math.ceil((dueAt - today) / 86400000);
    due = days <= 0 ? 100 : days <= 1 ? 95 : days <= 3 ? 80 : days <= 7 ? 60 : 35;
  }
  return Math.round(due * 0.45 + (IMPORTANCE[importance] ?? 65) * 0.35 + (EFFORT[effort] ?? 60) * 0.2);
}

export const getPriorityLabel = (score = 0) => score >= 75 ? "High" : score >= 50 ? "Medium" : "Low";
