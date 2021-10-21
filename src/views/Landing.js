import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from './Login';

export default function Landing({ user, userData, handleUserData }) {
  if (user && userData) {
    return <Dashboard user={user} userData={userData} handleUserData={handleUserData} />;
  } else {
    return <Login />;
  }
}
