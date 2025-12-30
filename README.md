# Weavy.ai - AI Workflow Builder

<div align="center">


**Turn your creative vision into scalable AI workflows**

A full-stack application that provides a visual node-based workflow builder for AI models, featuring Google OAuth authentication, real-time workflow management, and integration with Google's Gemini AI models.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-green?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-green?logo=mongodb)](https://www.mongodb.com/)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Workflow Builder](#-workflow-builder)
- [Authentication](#-authentication)
- [License](#-license)

---

## ✨ Features

### 🎨 Stunning Landing Page
- **Interactive Hero Section** with React Flow-powered node playground
- **AI Models Showcase** with scroll-triggered animations and transitions
- **Professional Tools Section** highlighting platform capabilities
- **Workflow Slider** demonstrating real-world use cases
- **Responsive Navbar** with scroll-aware animations and hover effects
- **Modern Footer** with comprehensive navigation

### 🔐 Authentication System
- **Google OAuth 2.0 Integration** for secure sign-in
- **JWT Token Management** with HTTP-only cookies
- **Session Persistence** with automatic token refresh
- **Protected Routes** with middleware authentication

### 📊 Dashboard
- **Grid & List View** for workflows and folders
- **Folder Management** with hierarchical organization
- **Context Menus** for quick actions (Open, Rename, Move, Delete, Duplicate)
- **Breadcrumb Navigation** for folder hierarchy
- **Showcase Section** with horizontal scrolling templates
- **Real-time Search** functionality
- **User Profile** with logout functionality

### 🔧 Workflow Builder (React Flow)
- **Visual Node-Based Editor** for AI workflows
- **Multiple Node Types**:
  - **Text Node** - Input/output text with rich editing
  - **Image Node** - Multi-image support with carousel view
  - **LLM Node** - AI model integration with Gemini API
- **Node Features**:
  - Drag & drop positioning
  - Node locking/unlocking
  - Rename functionality
  - Duplicate/Delete operations
  - Connected input/output handles
- **Edge Connections** with custom styling
- **Undo/Redo** with history stack (up to 50 states)
- **Auto-Save** functionality
- **Zoom Controls** (In, Out, Fit, 100%)
- **Pan & Select Tools**
- **Minimap** for navigation
- **Task Manager** for tracking running LLM operations

### 🤖 AI Integration
- **Google Gemini API** integration
- **Supported Models**:
  - Gemini 2.5 Flash
  - Gemini 1.5 Flash
  - Gemini 1.5 Pro
  - Gemini 1.0 Pro
- **Multi-modal Support** (text + images)
- **Output Propagation** to connected nodes

### 📁 File Organization
- **Folder System** with unlimited nesting
- **Move Operations** for files and folders
- **File Counts** per folder
- **Recent Files** sorting

---

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1 | React framework with App Router |
| **React** | 19.2 | UI component library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.1 | Utility-first CSS |
| **@xyflow/react** | 12.10 | Node-based workflow editor |
| **Zustand** | 5.0 | State management |
| **Radix UI** | Latest | Accessible UI primitives |
| **Lucide React** | 0.562 | Icon library |
| **React Hook Form** | 7.69 | Form handling |
| **Zod** | 4.2 | Schema validation |
| **Sonner** | 2.0 | Toast notifications |
| **Embla Carousel** | 8.6 | Carousel component |

### Backend (Server)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | 4.21 | Web server framework |
| **TypeScript** | 5.7 | Type-safe JavaScript |
| **MongoDB** | via Mongoose 8.9 | NoSQL database |
| **Passport.js** | 0.7 | Authentication middleware |
| **JWT** | 9.0 | Token-based auth |
| **Bcrypt.js** | 3.0 | Password hashing |
| **Google Auth Library** | 9.15 | OAuth integration |
| **Zod** | 3.24 | Request validation |
| **CORS** | 2.8 | Cross-origin requests |

---

## 📁 Project Structure

```
final/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── signin/        # Authentication page
│   │   │   └── dashboard/     # Protected dashboard
│   │   │       ├── page.tsx   # Dashboard main
│   │   │       └── workflow/  # Workflow builder
│   │   │           └── [id]/  # Dynamic workflow routes
│   │   ├── components/
│   │   │   ├── sections/      # Landing page sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── HeroNodes.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── ai-models.tsx
│   │   │   │   ├── ProfessionalTools.tsx
│   │   │   │   ├── ControlTheOutcome.tsx
│   │   │   │   ├── WorkflowsSlider.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── workflow/      # Workflow builder components
│   │   │   │   ├── workflow-builder.tsx
│   │   │   │   ├── nodes.tsx
│   │   │   │   └── custom-edges.tsx
│   │   │   ├── ui/            # 53+ UI components (Radix-based)
│   │   │   └── icons/
│   │   ├── stores/            # Zustand state management
│   │   │   └── workflowStore.ts
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   ├── auth.ts        # Auth utilities
│   │   │   └── utils.ts
│   │   ├── types/
│   │   │   └── workflow.types.ts
│   │   └── hooks/
│   └── public/                # Static assets
│
└── server/                    # Express.js Backend
    ├── src/
    │   ├── index.ts           # Server entry point
    │   ├── config/
    │   │   ├── database.ts    # MongoDB connection
    │   │   └── passport.ts    # Passport configuration
    │   ├── middleware/
    │   │   └── auth.ts        # JWT authentication
    │   ├── models/
    │   │   ├── User.ts        # User schema
    │   │   ├── Workflow.ts    # Workflow schema
    │   │   └── Folder.ts      # Folder schema
    │   ├── routes/
    │   │   ├── auth.ts        # Authentication routes
    │   │   ├── workflow.ts    # Workflow CRUD
    │   │   └── folder.ts      # Folder CRUD
    │   ├── schemas/           # Zod validation schemas
    │   │   ├── auth.ts
    │   │   ├── workflow.ts
    │   │   └── folder.ts
    │   └── types/
    └── vercel.json            # Deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)
- **MongoDB** (local or Atlas)
- **Google Cloud Console** account for OAuth

### Environment Variables

#### Client (`client/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

#### Server (`server/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/weavyai
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
```

### Installation & Running

1. **Clone the repository**
   ```bash
   cd final
   ```

2. **Install dependencies**
   ```bash
   # Client
   cd client
   bun install
   
   # Server
   cd ../server
   bun install
   ```

3. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Server
   cd server
   bun dev
   
   # Terminal 2 - Client
   cd client
   bun dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000
   - Health Check: http://localhost:4000/health

---

## 🏗 Architecture

### Data Flow
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  Next.js Client │────▶│  Express Server  │────▶│    MongoDB      │
│                 │     │                  │     │                 │
│  - React Flow   │◀────│  - REST API      │◀────│  - Users        │
│  - Zustand      │     │  - JWT Auth      │     │  - Workflows    │
│  - Tailwind     │     │  - Passport      │     │  - Folders      │
│                 │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                                                │
        │          ┌──────────────────┐                  │
        └─────────▶│  Google OAuth    │◀─────────────────┘
                   │  Google Gemini   │
                   └──────────────────┘
```

### State Management (Zustand)
The `workflowStore` manages:
- **nodes** & **edges** - React Flow state
- **viewport** - Canvas position and zoom
- **workflowId/Name** - Current workflow metadata
- **isDirty/isSaving** - Save state tracking
- **runTasks** - Running LLM operations
- **undoStack/redoStack** - History management

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Initiate Google OAuth flow |
| `GET` | `/auth/google/callback` | OAuth callback handler |
| `POST` | `/auth/google` | Handle Google token from frontend |
| `GET` | `/auth/session` | Validate session |
| `GET` | `/auth/me` | Get current user |
| `POST` | `/auth/logout` | Logout user |

### Workflow Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/workflow` | List user workflows |
| `POST` | `/workflow` | Create new workflow |
| `GET` | `/workflow/:id` | Get workflow by ID |
| `PUT` | `/workflow/:id` | Update workflow |
| `DELETE` | `/workflow/:id` | Delete workflow |

### Folder Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/folder` | List folders |
| `POST` | `/folder` | Create folder |
| `GET` | `/folder/:id` | Get folder by ID |
| `PUT` | `/folder/:id` | Update folder |
| `DELETE` | `/folder/:id` | Delete folder |

---

## 🔧 Workflow Builder

### Node Types

#### Text Node
- **Purpose**: Store and display text content
- **Handles**: Output (right side)
- **Features**: 
  - Rich text editing with textarea
  - Character count display
  - Lock/unlock functionality
  - Rename capability

#### Image Node
- **Purpose**: Upload and display images
- **Handles**: Output (right side)
- **Features**:
  - Multi-image upload (drag & drop or click)
  - Carousel navigation
  - View modes: Single / All
  - Image removal per-item
  - Lock/unlock functionality

#### LLM Node
- **Purpose**: Run AI inference with Gemini models
- **Handles**: 
  - System Prompt (input, left)
  - User Message (input, left)
  - Images (input, left)
  - Output (output, right)
- **Features**:
  - Model selection dropdown
  - Run button with loading state
  - Output display with markdown support
  - Error handling and display
  - Task tracking

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Delete/Backspace` | Delete selected |
| `Ctrl/Cmd + =` | Zoom in |
| `Ctrl/Cmd + -` | Zoom out |
| `Ctrl/Cmd + 0` | Reset zoom (100%) |
| `V` | Select tool |
| `H` | Pan tool |

---

## 🔐 Authentication

### OAuth Flow

1. User clicks "Continue with Google" on `/signin`
2. Redirected to `/auth/google` on backend
3. Passport initiates Google OAuth
4. User authenticates with Google
5. Callback to `/auth/google/callback`
6. Server creates/updates user in MongoDB
7. JWT token generated and set as cookie
8. Redirect to `/dashboard?token=...`
9. Client stores token in localStorage
10. Subsequent API calls include Bearer token

### Security Features

- **HTTP-only cookies** for token storage
- **Bearer token** authentication header
- **JWT expiration** (7 days)
- **Secure cookies** in production
- **CORS** with credentials

---

## 🎨 UI Components

The project includes **53+ UI components** built with Radix UI primitives:

- Accordion, Alert, Avatar, Badge
- Breadcrumb, Button, Calendar, Card
- Carousel, Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer, Dropdown Menu
- Form, Hover Card, Input, Label
- Menubar, Navigation Menu, Pagination, Popover
- Progress, Radio Group, Resizable, Scroll Area
- Select, Separator, Sheet, Sidebar
- Skeleton, Slider, Switch, Table
- Tabs, Textarea, Toggle, Tooltip
- And more...

---

## 📱 Responsive Design

- **Desktop-first** design approach
- **Mobile-friendly** navigation
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** controls in workflow builder

---

## 🚢 Deployment

### Vercel (Frontend)
The client is ready for Vercel deployment with `next.config.ts` configured.

### Backend
The server includes `vercel.json` for serverless deployment:

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/src/index.ts" }
  ]
}
```

---

## 📄 License

This project is created for interview/demonstration purposes.

---

## 🙏 Acknowledgments

- [Weavy.ai](https://weavy.ai) for design inspiration
- [React Flow](https://reactflow.dev) for the workflow editor
- [Radix UI](https://radix-ui.com) for accessible components
- [Google Gemini](https://ai.google.dev) for AI capabilities

---

<div align="center">

**Built with ❤️ using Next.js, Express, and MongoDB**

</div>
