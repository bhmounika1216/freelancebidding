import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import React from 'react';
import ProjectsPage from './components/Projectspage';

import MilestonesPage from './pages/MilestonesPage';  // ✅ create this
import ReviewsPage from './pages/ReviewsPage'; 

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects/:projectId/milestones" element={<MilestonesPage />} />  {/* ✅ NEW */}
        <Route path="/reviews/:userId" element={<ReviewsPage />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
