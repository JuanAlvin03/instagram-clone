//import React from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500"
          />

          <input
            type="text"
            placeholder="Full Name"
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500"
          />

          <button
            disabled
            className="w-full p-3 bg-blue-500 text-white rounded-xl opacity-60 cursor-not-allowed"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
}
