import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../app/AuthProvider"
import { db } from "../db"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const { login } = useAuthContext()
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || "/"

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const user = await db.users.where("username").equals(username).first()
    if (!user) {
      setError("User not found.")
      return
    }

    login(user.id)
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-3xl font-semibold mb-4">MyGram</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
