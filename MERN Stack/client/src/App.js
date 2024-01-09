import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { useState } from 'react'

const App = () => {
    const [role, setRole] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setRole={setRole} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<SuperAdminDashboard />} />
                <Route path="/staff" element={<AdminDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
