// src/pages/NotFound.tsx
import React from "react"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg bg-secondary text-primary-foreground hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
