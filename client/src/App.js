import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/NavBar.jsx';
import MyCalendar from './components/calender.jsx';
import EventDetails from './components/EventDetails';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import UserProfile from './components/UserProfile';

export const backendUrl = process.env.REACT_APP_BACKEND_URL;

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MyCalendar />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Redirect logic based on login status
  useEffect(()=>{
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    }
  },[isLoggedIn,navigate]);

  return(
  <div>
    <Navbar />
    <Outlet /> {/* Renders nested routes inside MainLayout */}
  </div>
)};

export default App;
