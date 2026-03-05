import { useState } from "react"
import { useNavigate, Link, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../app/AuthProvider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api/v1"

export default function LoginPage() {

  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      )

      const { userId, username: returnedUsername, accessToken } = response.data

      login(userId, returnedUsername, accessToken)
      navigate("/", { replace: true })
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed. Please try again.")
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

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

          <form onSubmit={handleLogin} className="space-y-4">

            {/* USER NAME */}
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            {/* PASSWORD FIELD */}
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="button-confirm darken-on-hover"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          {/* SIGN UP LINK*/}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary cursor-pointer">
              Register
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
