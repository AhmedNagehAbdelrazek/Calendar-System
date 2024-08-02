import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../RTK/slices/userSlice';

const UserProfile = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
