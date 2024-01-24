import React from 'react';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
