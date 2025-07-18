# Web Chat App

A real-time web chat application built with Node.js, Express.js, and Socket.IO for seamless messaging experiences.

## Features

- **Real-time messaging** - Instant message delivery using Socket.IO
- **User authentication** - Secure login and registration system
- **Message history** - Persistent chat history
- **Responsive design** - Works on desktop and mobile devices
- **Production ready** - Optimized for deployment

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **Cookie Parser** - Cookie parsing middleware
- **dotenv** - Environment variable management

### Frontend
- **Modern JavaScript/TypeScript** - Frontend functionality
- **HTML5 & CSS3** - User interface
- **Socket.IO Client** - Real-time communication

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/plinadev/web-chat-app.git
   cd web-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your configuration:
   ```env
   PORT=5050
   NODE_ENV=development
   JWT_SECRET=yoursecret
   DATABASE_URL=postgresql://
   EXPURATION_TIME=15d
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:5050` (or your specified PORT).

## 📁 Project Structure

```
web-chat-app/
├── backend/
│   ├── dist/           # Compiled backend code
│   ├── routes/         # API routes
│   │   ├── auth.route.js
│   │   └── message.route.js
│   ├── socket/         # Socket.IO configuration
│   │   └── socket.js
│   └── index.ts        # Main server file
├── frontend/
│   ├── dist/           # Built frontend files
│   └── src/            # Frontend source code
├── package.json
├── .env
└── README.md
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Message Routes
- `GET /api/messages` - Get message history
- `POST /api/messages` - Send a new message

## Socket.IO Events

The application uses Socket.IO for real-time communication. Key events include:
- `connection` - User connects to the chat
- `message` - Send/receive messages
- `disconnect` - User disconnects from the chat

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Make sure to set the following environment variables in your production environment:
- `NODE_ENV=production`
- `PORT=5050` (or your preferred port)
- `JWT_SECRET=yoursecret`
- `DATABASE_URL=postgresql://`
- `EXPURATION_TIME=15d` (cookie exp time)

### Deployment 
[Deployed web chat application](web-chat-app-sqyf.onrender.com/login)

