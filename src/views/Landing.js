import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from './Login';

export default function Landing({ user, userData }) {
  if (user && userData) {
    return <Dashboard userData={userData} />;
  } else {
    return <Login />;
  }
}
