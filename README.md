# 🌌 Reality Weaver – Parallel Reality Generator

Reality Weaver is an interactive web application that explores **alternate versions of reality**.  
By changing a single event in history, technology, or civilization, users can visualize how the world *might* have evolved differently.

Built using **Lovable Go**, this project combines a modern frontend with serverless AI-powered backend logic.

---

## 🚀 Live Demo

🔗 **Website:** https://e-seed.lovable.app  
🔗 **Repository:** https://github.com/ManakRaj-7/reality-weaver

---

## ✨ Features

- 🌍 **Parallel Reality Generator** – Explore “What if?” scenarios
- ⚡ **AI-powered timeline generation**
- 👤 **Guest mode access** (limited explorations)
- 🎨 **Modern animated UI** with cosmic visuals
- 🔐 **Authentication-ready architecture**
- ☁️ **Serverless backend using Supabase Functions**

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components

### Backend
- 🧠 Lovable Go
- 🗄️ Supabase
- ☁️ Supabase Edge Functions
- 🧾 PostgreSQL (via Supabase)

---

## 📁 Project Structure

```txt
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ScenarioInput.tsx
│   │   └── TimelineDisplay.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   ├── lib/
│   │   ├── generateReality.ts
│   │   └── utils.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── supabase/
│   ├── functions/
│   │   └── generate-reality/
│   │       └── index.ts
│   ├── migrations/
│   └── config.toml
│
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
