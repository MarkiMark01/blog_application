Description

This project is a blog platform that allows users to create, edit, view, and delete posts, as well as add and delete comments. It is built using Nest.js (backend) and React 19 + Redux Toolkit (frontend).

Installation and Setup

1. Clone the Repository

git clone https://github.com/your-username/blog_application.git
cd blog_application

2. Backend Setup (Nest.js)

cd server
npm install

Database Configuration

Install PostgreSQL and create a database blog_db.

Configure the .env file in the server/ directory:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=blog_db
PORT=5000

Start the Server

npm run start:dev

The backend will run on http://localhost:5000

3. Frontend Setup (React)

cd ../client
npm install
npm run dev

The frontend will be available at http://localhost:5173

Important Notes

Node.js 18+ is required for proper functionality

PostgreSQL 14+ is used for data storage

The .env file is necessary for the server to work

Additional Features

🔄 Multi-language support (i18n): language switcher (English/Ukrainian)

🌙 Dark and light theme

🚀 Redux Toolkit for state management

🔧 Validation on both backend and frontend
