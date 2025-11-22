import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthContext } from "./AuthProvider"

export default function RequireAuth() {
  const { userId } = useAuthContext()
  const location = useLocation()

  if (!userId) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
