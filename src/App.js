// src/App.js
import React, {useState}from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Updated import
import LandingPage from './pages/LandingPage';
import LikedProfiles from './pages/LikedProfiles';
import Discover from './pages/Discover';
import './index.css';  // Import global CSS
import FriendList from './pages/FriendList';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './components/ResetPassword';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [likedProfiles, setLikedProfiles] = useState([]); // Shared state for liked profiles

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} /> {/* Redirect to landing page */}
          <Route path="/reset-password" element={<ResetPassword />} />

          
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Discover likedProfiles={likedProfiles} setLikedProfiles={setLikedProfiles} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/likedProfiles"
            element={
              <ProtectedRoute>
                <LikedProfiles likedProfiles={likedProfiles} setLikedProfiles={setLikedProfiles} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FriendList"
            element={
              <ProtectedRoute>
                <FriendList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
