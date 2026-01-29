# 🌌 Reality Weaver – Parallel Reality Generator

Reality Weaver is an interactive web application that explores **alternate versions of reality**.  
Ask **"What if?"** questions and visualize how a single change could reshape **history, technology, and human civilization**.

Built with **Lovable**, combining a modern React frontend with serverless AI-powered backend logic.

---

## 🚀 Live Website

🔗 **Live Demo:** https://timeline-seed.lovable.app/  
🔗 **GitHub Repository:** https://github.com/ManakRaj-7/reality-weaver

---

## ✨ Features

### Core Experience
- 🌍 **Parallel Reality Generator** – Enter any "What if?" scenario and watch an alternate timeline unfold
- 🧠 **AI-Powered Generation** – Creates realistic timelines, headlines, and consequences using advanced AI
- 📰 **Breaking News Headlines** – Each reality comes with a news headline from that alternate world
- 📊 **Consequence Analysis** – See cultural, technological, and political impacts of each timeline

### User Features
- 👤 **Guest Mode** – Try 3 free explorations without signing up
- 🔐 **Authentication** – Create an account for unlimited generations
- 📚 **History Page** – View, revisit, and manage all your saved realities
- 🗑️ **Delete Realities** – Remove unwanted explorations from your history

### Social Features
- 🔗 **Share Timelines** – Generate public links to share your alternate realities with anyone
- 🌐 **Community Gallery** – Browse public realities created by other users at `/gallery`
- 🍴 **Fork Realities** – Click on any timeline event to explore "what if that went differently?"

### Design
- 🎨 **Cosmic UI** – Beautiful animated interface with particle effects and gradients
- 📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile
- ✨ **Smooth Animations** – Framer Motion powered transitions throughout

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18 + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components
- 🎬 Framer Motion

### Backend
- ☁️ Lovable Cloud (Supabase)
- 🔧 Edge Functions (Deno)
- 🗄️ PostgreSQL Database
- 🔐 Row Level Security (RLS)

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
│   │   ├── ui/               # shadcn/ui components
│   │   ├── CosmicBackground.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── NavLink.tsx
│   │   ├── ScenarioInput.tsx
│   │   └── TimelineDisplay.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.tsx       # Authentication context
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
│   ├── pages/
│   │   ├── Auth.tsx          # Login/Signup
│   │   ├── Gallery.tsx       # Public realities
│   │   ├── History.tsx       # User's saved realities
│   │   ├── Index.tsx         # Main generator
│   │   ├── NotFound.tsx
│   │   └── SharedReality.tsx # View shared timelines
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── supabase/
│   ├── functions/
│   │   └── generate-reality/
│   │       └── index.ts      # AI generation edge function
│   ├── migrations/
│   └── config.toml
│
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
---
## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManakRaj-7/reality-weaver.git
   cd reality-weaver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:5173

---

## 📜 License

MIT License – Feel free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using [Lovable](https://lovable.dev)
