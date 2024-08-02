# Notes App (MERN Stack)

## Project Description

This project is a Notes App built using the MERN stack (MongoDB, Express.js, React, Node.js). The app allows users to create, archive, and trash notes. Additionally, users can change the background color of their notes.

## Features

- **User Authentication**: Secure user authentication using JWT (JSON Web Token).
- **Create Note**: Users can create new notes with custom content.
- **Archive Note**: Users can archive notes that they no longer need but want to keep.
- **Trash Note**: Users can move notes to trash.
- **Change Background Color**: Users can change the background color of their notes for better organization and personalization.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or cloud-based instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/notes-app.git
```
2. Navigate to the project directory:

```bash
cd notes-app
```
3. Install backend dependencies::

```bash
cd backend
npm install
```
4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Configuration

1.Create a `.env`file in the backend directory and add the following environment variables::

```env
MONGO_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_jwt_secret
PORT=5000

```
2. Update the `backend/config/db.js` file with your MongoDB connection string if it differs from the default one.

### Running the Application

1. Start the backend server::

```bash
cd backend
npm start

```
2. Start the frontend server:
   
```bash
cd ../frontend
npm start

```
The application should now be running on `http://localhost:3000`.

# API Endpoints

### Authentication
- POST /api/auth/register: Register a new user
- POST /api/auth/login: Login a user

### Notes

- GET /api/notes: Get all notes for the authenticated user
- POST /api/notes: Create a new note
- PUT /api/notes/
 : Update a note by ID
- DELETE /api/notes/
  : Delete a note by ID
- PUT /api/notes/
  archive: Archive a note by ID
- PUT /api/notes/
  trash: Move a note to trash by ID
- PUT /api/notes
   : Change the background color of a note by ID

## Folder Structure
   ```arduino
     notes-app/
     │
     ├── backend/
     │   ├── config.js
     │   ├── middleware/ 
     │   ├── models/
     │   ├── routes/
     │   └── server.js
     │
     ├── frontend/
     │   ├── public/
     │   ├── src/
     │   │   ├── components/
     │   │   ├── context/
     │   │   ├── App.jsx
     │   │   ├── App.css
     │   │   ├── index.css
     │   │   ├── main.jsx
     │   └── index.html
     │   └── package.json
     │
     └── README.md

   ```  
  ## Contributing

  Contributions are welcome! Please fork the repository and create a pull request.
  
  #### Happy coding!

  
