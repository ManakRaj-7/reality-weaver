# 🌌 Reality Weaver – Parallel Reality Generator

Reality Weaver is an interactive web application that explores **alternate versions of reality**.  
It allows users to ask **“What if?”** questions and visualize how a single change could reshape **history, technology, and human civilization**.

This project was built using **Lovable Go**, combining a modern frontend with a serverless, AI-powered backend.

---

## 🚀 Live Website

🔗 **Live Demo:** https://timeline-seed.lovable.app/  
🔗 **GitHub Repository:** https://github.com/ManakRaj-7/reality-weaver

---

## ✨ Features

- 🌍 **Parallel Reality Generator** – Explore alternate timelines using “What if?” scenarios  
- 🧠 **AI-powered timeline generation**
- 👤 **Guest mode access** with limited explorations
- 🎨 **Modern animated UI** with cosmic visuals
- ⚡ **Fast, responsive frontend**
- ☁️ **Serverless backend powered by Supabase**

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components

### Backend
- 🧠 Lovable Go
- ☁️ Supabase Edge Functions
- 🗄️ PostgreSQL (Supabase)

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
