<div align="center">

# 🖋️ FormForge

### *The Premium Form Studio*

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yash-kumarsharma/formforge)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg?logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/express-5.2.1-000000.svg?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-latest-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/prisma-5.22.0-2D3748.svg?logo=prisma)](https://www.prisma.io/)
[![Vite](https://img.shields.io/badge/vite-5.0.0-646CFF.svg?logo=vite)](https://vitejs.dev/)

**A high-end, full-stack form creation platform designed for those who value clarity, precision, and a premium user experience.**

[Features](#-core-features) • [Tech Stack](#-tech-stack) • [Installation](#️-installation--setup) • [API](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

## 📸 Screenshots

![FormForge Dashboard](file:///C:/Users/Yash/.gemini/antigravity/brain/e8cb1e2f-75b0-4c48-bc4b-8418ac68acd7/vellum_hero_illustration_1770929356456.png)

> *Modern, elegant interface with glassmorphism effects and dynamic theming*

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

### Frontend
![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.20.0-CA4245?logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-0055FF?logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.292.0-F56565?logo=lucide&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.2-5A29E4?logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-336791?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.3-000000?logo=jsonwebtokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-010101?logo=socket.io&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-5.10.0-DC382D?logo=redis&logoColor=white)

### DevOps & Tools
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?logo=git&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-3.1.11-76D04B?logo=nodemon&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?logo=jest&logoColor=white)

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

## 🌐 Deployment

### Vercel (Recommended)

FormForge is optimized for deployment on Vercel with zero configuration:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   Add the following in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`

4. **Deploy**
   - Vercel will automatically detect the configuration
   - Build and deployment happen automatically

### Manual Deployment

```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

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

**FormForge** - *Crafting beautiful forms for the modern web* ✨

Made with ❤️ by [Yash Kumar Sharma](https://github.com/yash-kumarsharma)

⭐ Star this repo if you find it helpful!

</div>
