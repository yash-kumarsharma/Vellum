<div align="center">

# 🖋️ Vellum

### *The Premium Form Studio*

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yash-kumarsharma/formforge)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Deployed](https://img.shields.io/badge/status-deployed-success.svg)](https://vercel.com/)

**A high-end, full-stack form creation platform designed for those who value clarity, precision, and a premium user experience.**

[Features](#-core-features) • [Tech Stack](#-tech-stack) • [Installation](#️-installation--setup) • [API](#-api-endpoints)

</div>

---

## ✨ Core Features

### 🎨 Design & Personalization
- **🌓 Dynamic Theming**: True Dark/Light mode support across the entire platform, integrated with the global design system
- **👤 User Identity**: Personalized profile avatars with custom color synchronization
- **💎 Premium UI**: Glassmorphism effects, smooth hover-scale transitions, and high-fidelity iconography powered by Lucide React
- **🎨 HSL-Based Design System**: Semantic color tokens for consistent, maintainable styling

### 🛠️ Studio Features
- **📋 Template Gallery**: Start instantly with curated templates for Feedback, Events, and Market Research
- **✏️ Sophisticated Editor**: Real-time form building with complex question types:
  - Multiple Choice
  - Checkboxes
  - Short Answer
  - Long Answer
  - And more...
- **🔒 Access Control**: Securely toggle forms between 'Live' and 'Private' modes for total privacy control
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### 📊 Intelligence & Management
- **📈 Live Analytics**: Real-time response aggregation visible directly on your studio dashboard
- **🔍 Universal Search**: Instantly find your work with a lightning-fast dashboard search engine
- **🔔 Studio Toast System**: A refined, internal notification system replacing intrusive browser alerts
- **📤 Export Capabilities**: Download form responses in Excel format for further analysis
- **⚡ Real-time Updates**: WebSocket integration for live form response notifications

---

## 🚀 Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend** | React | 18.3.1 | UI Library |
| | Vite | 5.0.0 | Build Tool & Dev Server |
| | React Router | 6.20.0 | Client-side Routing |
| | Framer Motion | 10.16.4 | Animations |
| | Lucide React | 0.292.0 | Icon Library |
| | Axios | 1.6.2 | HTTP Client |
| **Backend** | Node.js | 18+ | Runtime Environment |
| | Express | 5.2.1 | Web Framework |
| | Prisma | 5.22.0 | ORM & Database Toolkit |
| | PostgreSQL | Latest | Relational Database |
| | JWT | 9.0.3 | Authentication |
| | Socket.io | 4.8.1 | Real-time Communication |
| | Redis | 5.10.0 | Caching & Session Store |
| **DevOps** | Vercel | - | Hosting & Deployment |
| | Git | - | Version Control |
| | Nodemon | 3.1.11 | Development Hot Reload |
| | Jest | 30.2.0 | Testing Framework |

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yash-kumarsharma/formforge.git
cd formforge
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/formforge?schema=public"

# JWT Configuration
JWT_SECRET="your_super_secret_jwt_key_here"

# Redis Configuration (Optional)
REDIS_URL="redis://localhost:6379"

# CORS Configuration
FRONTEND_URL="http://localhost:5173"
```

### 3. Install Dependencies
```bash
# Install all dependencies (Root, Backend, Frontend)
npm run install:all
```

### 4. Database Setup
```bash
# Generate Prisma Client
npm run setup

# Run database migrations (from backend directory)
cd backend
npx prisma migrate dev --name init
npx prisma db seed  # Optional: seed with sample data
cd ..
```

### 5. Launch the Application
```bash
# Start both Backend & Frontend concurrently
npm start
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

### Alternative: Run Separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

---

## 📐 Project Architecture

```
formforge/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # Global styles & design system
│   │   ├── utils/           # Helper functions
│   │   └── main.jsx         # Application entry point
│   └── package.json
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── forms/       # Form management
│   │   │   ├── responses/   # Response handling
│   │   │   └── users/       # User management
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
├── package.json              # Root package configuration
├── vercel.json               # Vercel deployment config
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Forms
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/forms` | Get all user forms | ✅ |
| GET | `/api/forms/:id` | Get specific form | ✅ |
| POST | `/api/forms` | Create new form | ✅ |
| PUT | `/api/forms/:id` | Update form | ✅ |
| DELETE | `/api/forms/:id` | Delete form | ✅ |
| PATCH | `/api/forms/:id/toggle` | Toggle form status | ✅ |

### Responses
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/responses/:formId` | Get form responses | ✅ |
| POST | `/api/responses/:formId` | Submit response | ❌ |
| GET | `/api/responses/:formId/export` | Export to Excel | ✅ |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | ✅ |
| PUT | `/api/users/profile` | Update profile | ✅ |

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend linting
cd frontend
npm run lint
```

---

## 📝 Available Scripts

### Root Directory
- `npm run install:all` - Install all dependencies
- `npm run setup` - Generate Prisma client
- `npm start` - Start both frontend and backend
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run build` - Build for production

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Yash Kumar Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-yash--kumarsharma-181717?logo=github)](https://github.com/yash-kumarsharma)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?logo=linkedin)](https://linkedin.com/in/yash-kumarsharma)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Express](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**Vellum** - *Crafting beautiful forms for the modern web* ✨

Made with ❤️ by [Yash Kumar Sharma](https://github.com/yash-kumarsharma)

⭐ Star this repo if you find it helpful!

</div>
