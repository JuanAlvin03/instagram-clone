import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuthContext } from "../app/AuthProvider"
import { db } from "../db"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const { login } = useAuthContext()
  const [users, setUsers] = useState<any[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || "/"

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
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-3xl font-semibold mb-4">MyGram</h1>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* USER DROPDOWN */}
            <select
              className="w-full border rounded-md p-2 bg-muted text-foreground"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select user…</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>

            {/* DISABLED PASSWORD FIELD */}
            <Input
              placeholder="Password (disabled)"
              disabled
              className="opacity-50 pointer-events-none"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          {/* SIGN UP LINK (dummy for now) */}
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
