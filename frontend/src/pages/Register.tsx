//import React from "react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../app/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1"

export default function RegisterPage() {

  const { userId, login } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.")
      return
    }

    if (username.length > 25) {
      setError("Username must be 25 characters or less.")
      return
    }

    if (/[\s\/,@#$%^&*()+=\[\]{};:'"|\\\<>?`~]/.test(username)) {
      setError("Username contains invalid characters.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        { username, password },
        { withCredentials: true }
      )

      const { id, username: returnedUsername } = response.data

      // Automatically login the user after successful registration
      // Note: We need to login to get the access token, so make a login request
      const loginResponse = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      )

      const { userId: loginUserId, username: loginUsername, accessToken } = loginResponse.data
      
      login(loginUserId, loginUsername, accessToken)
      navigate("/", { replace: true })
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed. Please try again.")
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit" 
              onClick={handleRegister}
              disabled={isLoading}
              className="button-confirm darken-on-hover"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
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
