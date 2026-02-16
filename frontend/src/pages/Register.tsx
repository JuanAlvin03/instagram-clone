//import React from "react";
import { Link, Navigate, useLocation,  } from "react-router-dom";
import { useAuthContext } from "../app/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {

  const { userId } = useAuthContext()
  const location = useLocation()

  if (userId) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-3xl font-semibold mb-4">Sign Up</h1>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              disabled
              className="opacity-50 pointer-events-none"
            />

            <Input
              type="text"
              placeholder="Full Name"
              disabled
              className="opacity-50 pointer-events-none"
            />

            <Input
              type="password"
              placeholder="Password"
              disabled
              className="opacity-50 pointer-events-none"
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

          <p className="text-sm text-muted-foreground">
            This is a demo app. Registration is disabled, but you can log in with one of the pre-defined users.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
