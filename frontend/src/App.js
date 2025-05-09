import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeProvider } from "./context/darkMode";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout components
import Navbar from "./components/navbar";
import Header from "./components/header";
import Footer from './components/footer';
import Searchbar from "./components/undernavbar";
import Path from "./components/path";

// Pages
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./components/profile";
import Quizz from "./components/quiz";
import { ErrorSection7 } from "./pages/NotFound";
import Leaderboard from "./components/leaderBoard";
import PDFDisplay from "./components/fileDisplay";
import ChatBot from "./pages/chatPage";

const MainLayout = ({ children }) => (
  <>
    <Header />
    <Navbar />
    <Searchbar />
    {children}
    <Footer />
  </>
);

const AuthLayout = ({ children }) => (
  <>
    <Header />
    <Navbar />
    <Searchbar />
    <Path />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><MainLayout><Quizz /><ChatBot/></MainLayout></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><MainLayout><Quizz /><ChatBot/></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><MainLayout><Leaderboard /></MainLayout></ProtectedRoute>} />
            <Route path="/pdfDisplay" element={<ProtectedRoute><MainLayout><PDFDisplay /></MainLayout></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><MainLayout><ChatBot /></MainLayout></ProtectedRoute>} />
            
            {/* Redirect root to login if not authenticated */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 route */}
            <Route path="*" element={<MainLayout><ErrorSection7 /></MainLayout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  );
};

export default App;