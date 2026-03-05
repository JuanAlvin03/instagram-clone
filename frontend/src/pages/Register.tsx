//import React from "react";
import { Link, Navigate, useLocation,  } from "react-router-dom";
import { useAuthContext } from "../app/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {

  const { userId } = useAuthContext()
  const location = useLocation()

  // if have user id and token, redir to home
  if (userId) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen sick-bg p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-3xl font-semibold mb-4">MyGram</h1>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            <Input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            <Input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            <Button
              type="submit" className="button-confirm darken-on-hover"
            >
              Sign Up
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary cursor-pointer">Log In</Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
