import React from 'react';

const LoginForm = () => {
  return (
    <form className="w-96 mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
