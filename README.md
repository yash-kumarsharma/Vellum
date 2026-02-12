# 🖋️ Vellum: The Premium Form Studio

Vellum is a high-end, full-stack form creation platform designed for those who value clarity, precision, and a premium user experience. Built with a focus on modern aesthetics (HSL-based design system) and micro-interactions, Vellum elevates simple data collection into a creative studio experience.

![Vellum Hero Illustration](file:///C:/Users/Yash/.gemini/antigravity/brain/e8cb1e2f-75b0-4c48-bc4b-8418ac68acd7/vellum_hero_illustration_1770929356456.png)

## ✨ Core Features

### 🎨 Design & Personalization
- **Dynamic Theming**: True Dark/Light mode support across the entire platform, integrated with the global design system.
- **Vellum Identity**: Personalized profile avatars with custom color synchronization.
- **Premium UI**: Glassmorphism, smooth hover-scale transitions, and high-fidelity iconography (Lucide).

### 🛠️ Studio Features
- **Template Gallery**: Start instantly with curated templates for Feedback, Events, and Market Research.
- **Sophisticated Editor**: Real-time form building with complex question types (Multiple Choice, Checkboxes, etc.).
- **Access Control**: Securely toggle Vellums between 'Live' and 'Private' modes for total privacy control.

### 📊 Intelligence & Management
- **Live Analytics**: Real-time response aggregation visible directly on your studio dashboard.
- **Universal Search**: Instantly find your work with a lightning-fast dashboard search engine.
- **Studio Toast System**: A refined, internal notification system replacing intrusive browser alerts.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Lucide Icons, HSL Semantic Theming.
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL (Prisma ORM).
- **Authentication**: JWT Protection.

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Instance

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=4000
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
```

### 3. Quick Start (Full-Stack)
From the root directory:
```bash
# Install all dependencies (Root, Backend, Frontend)
npm run install:all

# Generate Prisma Client
npm run setup

# Launch Vellum Studio (Backend & Frontend concurrently)
npm start
```

## 📐 Architecture

- `/frontend`: React application using a custom-built Vellum Design System.
- `/backend`: Scalable Express API with modular controllers and services.
- `/prisma`: Schema definitions and safe database migrations.

---

Built with precision by **Yash Kumar Sharma**.
*Vellum: Crafting beautiful interfaces for the modern web.*
