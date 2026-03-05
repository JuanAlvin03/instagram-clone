import { useState, useEffect } from "react"
import { useNavigate, Link, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../app/AuthProvider"
import { db } from "../db"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { User } from "@/types/models"

export default function LoginPage() {

  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [error, setError] = useState("")
  
  // Load all seeded users from Dexie
  useEffect(() => {
    db.users.toArray().then(setUsers)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!selectedUserId) {
      setError("Please select a user.")
      return
    }

    login(selectedUserId)
    navigate("/", { replace: true })
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
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            {/* PASSWORD FIELD */}
            <Input
              placeholder="Password"
              type="password"
              className="w-full border rounded-md p-2 bg-muted text-foreground"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="button-confirm darken-on-hover">
              Log in
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
