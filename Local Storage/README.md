# React + Vite Password Manager

Official Vite React Plugins 

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Usage
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install     # or yarn install
npm run dev
```
# What this project does 
This is a Password Manager application built with React and Vite. It allows users to:
- Add, delete, and manage tasks in a Password Manager style interface.
- Mark tasks as completed to keep track of progress.
- The application is built using TypeScript for type safety and better development experience.
- Also includes a version of Mongo DB for storing passwords mimicking a real-world password manager that uses database.

The app is designed to be responsive and user-friendly, ensuring a seamless experience across both desktop and mobile devices.
1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate to the project directory:
   ```bash
   cd my-react-app
   ```
3. Install the dependencies:
   ```bash
   npm install  # or yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev  # or yarn dev
   ```
5. Open your browser and go to `http://localhost:3000` (can be different e.g, `http://localhost:5173` etc) to see the application in action.

# Features
Write features of this password manager application here:
- **Add Passwords**: Users can add new passwords with associated details.
- **Delete Passwords**: Users can remove passwords they no longer need.
- **Edit Passwords**: Users can update existing passwords and their details.

# Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a smooth development experience.
- **ESLint**: A tool for identifying and fixing problems in JavaScript/TypeScript code.
- **Prettier**: A code formatter that ensures a consistent style across the codebase.
- **CSS Modules**: A CSS file that locally scopes class names and animations by default.
- **MongoDB**: A NoSQL database for storing passwords, mimicking a real-world password manager.
# Folder Structure
```plaintext
my-react-app/
├── public/                # Static assets  
├── src/                   # Source code
│   ├── components/                  # Reusable components
│                 ├── Header.jsx     # Header component
│                 ├── Manager.jsx    # Body component for managing passwords
│                 ├── Footer.jsx     # Footer component
│   ├── App.css            # CSS file for App
│   ├── App.jsx            # App coding component
│   ├── index.css          # Entry point of the application
│   └── main.jsx           # Main application component
├── .eslintrc.js           # ESLint configuration
├── index.html             # Main HTML file
├── package-lock.json      # Lock file for npm dependencies
├── package.json           # Project metadata and dependencies
├── Readme.md              # Project documentation
└── vite.config.ts         # Vite configuration
```