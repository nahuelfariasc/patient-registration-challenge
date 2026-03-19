# Patient Registration Challenge
A full-stack application for patient registration with validation, file upload, and email notifications.

## 🚀 Tech Stack

### Backend
- **Laravel** - PHP Framework
- **PostgreSQL** - Database
- **Redis** - Queue system
- **Docker** - Containerization

### Frontend
- **React + TypeScript** - Frontend framework with Vite
- **React Hook Form + Zod** - Forms and validation
- **Axios** - HTTP client
- **React Dropzone** - Drag & drop file upload

## 📦 Features

### Backend
- ✅ REST API for patient registration
- ✅ Validation with Laravel rules
- ✅ Unique email verification
- ✅ File upload (.jpg)
- ✅ PostgreSQL persistence
- ✅ Asynchronous email sending (queues)
- ✅ Dockerized environment

### Frontend
- ✅ Patient list with expandable cards
- ✅ Registration form with validation
- ✅ Drag & drop file upload with preview
- ✅ Error handling with animations
- ✅ Success/Error modal feedback
- ✅ Automatic list refresh after creation

## 🐳 Getting Started

### Prerequisites
- Docker and Docker Compose
- Git
- Node.js (for local frontend development)

### 1. Clone repository
```bash
git clone <repo-url>
cd patient-registration-challenge
```

### 2. Configure Environment
```bash
cd backend
cp .env.example .env
php artisan key:generate

# Configure Mailtrap credentials in .env:
# MAIL_USERNAME=your_mailtrap_username
# MAIL_PASSWORD=your_mailtrap_password
```

### 3. Start Docker
```bash
docker-compose up -d
```

### 4. Setup Backend
```bash
cd backend
php artisan migrate
php artisan storage:link

# Start queue worker in background
docker exec -d laravel_app php artisan queue:work
```

### 5. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 📬 Email Testing

Emails are handled asynchronously using Redis queues and can be tested with **Mailtrap**. Configure Mailtrap credentials in the backend `.env` file.

## 🧠 Future Improvements

- 🔄 SMS notifications integration (architecture ready)

## 📁 Project Structure

```
patient-registration-challenge/
├── backend/                 # Laravel application
│   ├── app/                # Application logic
│   ├── database/           # Migrations and seeders
├── docker/                  # Docker configuration
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── pages/         # Main pages
│   └── public/            # Static files
└── docker-compose.yml     # Services orchestration