# FocusFlow

FocusFlow is a local-first productivity OS portfolio project built with React + Vite.

## Included experience

- Real-time circular analog FocusFlow clock on the landing/login experience
- Priority-based task management
- Focus Mode
- Light / Dark / System themes
- Eight theme palettes with premium Plus themes
- Responsive desktop sidebar + mobile bottom navigation
- Premium activation celebration with generated browser audio + confetti
- FocusFlow Plus branding after activation
- 3D animated About Developer experience
- FocusFlow Elite roadmap card
- Local demo onboarding
- Browser notification permission flow

## Demo authentication

This is a portfolio/demo authentication system. It is **not production-grade authentication**.

Admin demo:

- Email: `admin@focusflow.local`
- Password: `FocusFlow@2026`

Premium demo activation code:

- `KRISHNA49`

The activation code is intentionally not displayed inside the UI. No real payment or UPI transaction is processed.

## Privacy model

Tasks, settings and demo session state are stored in browser LocalStorage. The app does not send task data to a backend.

Browser reminders in this demo depend on the app/browser being active. Reliable background push notifications would require a service worker, push subscription and backend infrastructure.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
