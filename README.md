# LeadFlow CRM

> A modern, full-stack Customer Relationship Management (CRM) application built with React, Node.js, and MongoDB. Streamline your lead management, track customer interactions, and boost your sales pipeline efficiency.

![Status](https://img.shields.io/badge/status-active-success)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.0-brightgreen)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Author](#-author)

---

## 🎯 Project Overview

**LeadFlow CRM** is a comprehensive lead management solution designed for sales teams and businesses to:
- Organize and track potential customers (leads)
- Monitor lead status through multiple stages (New → Contacted → Qualified → Converted/Lost)
- Search and filter leads efficiently
- Track lead statistics and conversion metrics
- Manage lead information with a user-friendly interface

The application features a responsive web interface built with modern web technologies, a robust REST API backend, and real-time data synchronization.

---

## ✨ Features

### Lead Management
- ✅ **Create Leads** - Add new prospects with comprehensive information
- ✅ **View All Leads** - Display leads with pagination and sorting
- ✅ **Edit Leads** - Update lead details and status
- ✅ **Delete Leads** - Remove leads from the system
- ✅ **Lead Search** - Real-time search across lead names, emails, and companies

### Filtering & Organization
- 🔍 **Advanced Filtering** - Filter leads by status (New, Contacted, Qualified, Converted, Lost)
- 📊 **Status Tracking** - Monitor leads through 5 different pipeline stages
- 📄 **Pagination** - Navigate large datasets efficiently
- 🔄 **Sorting** - Sort by creation date, name, or other fields

### Analytics & Insights
- 📈 **Dashboard Statistics** - View lead count by status
- 📊 **Conversion Metrics** - Track sales pipeline health
- 📉 **Real-time Updates** - Instant data refresh after actions

### User Experience
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Vite and React
- 🎨 **Modern UI** - Tailwind CSS with professional design

### Developer Features
- 🔐 **CORS Support** - Flexible development and production configurations
- 📝 **Form Validation** - Client-side validation with React Hook Form
- 🚀 **RESTful API** - Clean, well-structured API endpoints
- 📊 **Request Logging** - Morgan middleware for request tracking
- 🐛 **Error Handling** - Comprehensive error handling and user feedback

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI library and component framework |
| **Vite** | 5+ | Lightning-fast build tool and dev server |
| **Tailwind CSS** | 3+ | Utility-first CSS framework |
| **React Hook Form** | 7+ | Efficient form state management |
| **Axios** | Latest | HTTP client for API requests |
| **Lucide React** | Latest | Beautiful icon library |
| **React Hot Toast** | Latest | Elegant toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20+ | JavaScript runtime |
| **Express.js** | 4+ | Web framework |
| **MongoDB** | 4.0+ | NoSQL database |
| **Mongoose** | 8+ | MongoDB ODM |
| **CORS** | Latest | Cross-Origin Resource Sharing |
| **Morgan** | Latest | HTTP request logger |
| **Dotenv** | Latest | Environment variable management |

### Tools & Services
| Tool | Purpose |
|------|---------|
| **npm** | Package management |
| **Git** | Version control |
| **Render** | Cloud deployment |
| **Vercel** | Frontend deployment (optional) |

---

## 📦 Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v20.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (v9.0 or higher) - Usually comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Hrithikdoi/leadflow-crm.git
cd leadflow-crm/crm-app
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Create Environment Files
Create a `.env` file in the `backend` directory:
```bash
cd ../backend
# Create .env file (see Environment Variables section)
```

Create a `.env` file in the `frontend` directory:
```bash
cd ../frontend
# Create .env file (see Environment Variables section)
```

### Step 5: Start MongoDB
Ensure MongoDB is running on your system:

**Windows (if installed as service):**
```bash
net start MongoDB
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or start MongoDB directly:**
```bash
mongod
```

### Step 6: Start the Backend Server
```bash
cd backend
npm start
```

Expected output:
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

### Step 7: Start the Frontend Development Server (in a new terminal)
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

### Step 8: Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/crm_db

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Optional: For production deployment
# NODE_ENV=production
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm_db
# FRONTEND_URL=https://yourdomain.com
```

**Environment Variable Descriptions:**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Port where Express server runs |
| `NODE_ENV` | development | Application environment (development/production) |
| `MONGO_URI` | localhost | MongoDB connection string |
| `FRONTEND_URL` | http://localhost:5173 | Frontend URL for CORS configuration |

### Frontend (`frontend/.env`)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

**Environment Variable Descriptions:**

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | http://localhost:5000/api | Backend API base URL |

### Development vs Production

**Development Mode:**
- CORS: Flexible (allows all localhost ports)
- Database: Local MongoDB instance
- Frontend: Hot reload enabled (port 5173)

**Production Mode:**
- CORS: Strict (only specified FRONTEND_URL)
- Database: MongoDB Atlas or production instance
- Frontend: Static build (Vercel or similar)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Lead Endpoints

#### Get All Leads
```http
GET /leads?page=1&limit=10&status=&search=&sortBy=createdAt&order=desc
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Records per page (default: 10) |
| `status` | string | Filter by status (New, Contacted, Qualified, Converted, Lost) |
| `search` | string | Search query (name, email, company) |
| `sortBy` | string | Sort field (createdAt, name, email, status) |
| `order` | string | Sort order (asc, desc) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "(555) 123-4567",
      "company": "Tech Corp",
      "status": "New",
      "notes": "Interested in enterprise plan",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50
  }
}
```

#### Search Leads
```http
GET /leads/search?q=john&status=New&page=1&limit=10
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query |
| `status` | string | Filter by status (optional) |
| `page` | number | Page number |
| `limit` | number | Records per page |

#### Get Lead Statistics
```http
GET /leads/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "byStatus": {
      "New": 15,
      "Contacted": 12,
      "Qualified": 10,
      "Converted": 8,
      "Lost": 5
    }
  }
}
```

#### Get Single Lead
```http
GET /leads/:id
```

#### Create Lead
```http
POST /leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "company": "Tech Corp",
  "status": "New",
  "notes": "Interested in enterprise plan"
}
```

**Validation Rules:**
- `name`: Required, string, 2-100 characters
- `email`: Required, valid email format, unique
- `phone`: Required, string, 10-20 characters
- `company`: Required, string, 2-100 characters
- `status`: Required, enum (New, Contacted, Qualified, Converted, Lost)
- `notes`: Optional, string, max 500 characters

#### Update Lead
```http
PUT /leads/:id
Content-Type: application/json

{
  "status": "Contacted",
  "notes": "Called - interested in demo"
}
```

#### Delete Lead
```http
DELETE /leads/:id
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)
*The main dashboard displays lead statistics, charts, and recent activity*

### Leads Table
![Leads Table](./screenshots/leads-table.png)
*View all leads with pagination, filtering, and search functionality*

### Create Lead Modal
![Create Lead](./screenshots/create-lead.png)
*Modal form for adding new leads with validation*

### Lead Filters
![Filters](./screenshots/filters.png)
*Advanced filtering by status and other criteria*

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)
*Professional dark theme for reduced eye strain*

---

## 🚀 Deployment

### Option 1: Render (Backend) + Vercel (Frontend)

**Backend Deployment to Render:**
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set Start Command: `npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://...
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
6. Deploy

**Frontend Deployment to Vercel:**
1. Create account at [vercel.com](https://vercel.com)
2. Import project from GitHub
3. Set Framework: Vite
4. Add Environment: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Option 2: Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
EXPOSE 5000
CMD ["node", "backend/server.js"]
```

**Build and Run:**
```bash
docker build -t leadflow-crm .
docker run -p 5000:5000 --env-file .env leadflow-crm
```

### Option 3: Traditional VPS

1. SSH into server
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set up PM2 for process management
6. Configure Nginx reverse proxy
7. Set up SSL with Let's Encrypt

---

## 💻 Development

### Available Scripts

**Backend:**
```bash
npm start          # Start development server
npm run test       # Run tests
```

**Frontend:**
```bash
npm run dev        # Start with HMR
npm run build      # Production build
npm run preview    # Preview production build
```

### Project Structure

```
leadflow-crm/crm-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── leadController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leadRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Ensure MongoDB is running
mongosh

# Check port
netstat -an | grep 27017
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
Verify `FRONTEND_URL` in backend `.env` matches your frontend URL exactly.

### Module Not Found
```bash
npm install
```

---

## 👤 Author

**Hrithik Doiphode**
- GitHub: https://github.com/Hrithikdoi
- Email: hrithikdoi1@gmail.com
- LinkedIn: https://www.linkedin.com/in/hrithik-doiphode/

### Acknowledgments
- React & Vite communities
- MongoDB documentation
- Tailwind CSS team

---

**Version:** 1.0.0  
**Last Updated:** June 2024
