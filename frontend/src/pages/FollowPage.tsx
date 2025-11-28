import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { db } from "@/db"
import type { User, Follow } from "@/types/models"
import FollowListItem from "@/components/follow/FollowListItem"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  tab: "followers" | "following"
}

const FollowPage = ({ tab }: Props) => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [owner, setOwner] = useState<User | null>(null)
  const [items, setItems] = useState<User[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!username) return

    ;(async () => {
      const u = await db.users.where("username").equals(username).first()
      if (!u) return
      setOwner(u)
    })()
  }, [username])

  // Load followers / following
  useEffect(() => {
    if (!owner) return

    ;(async () => {
      let results: Follow[] = []

      if (tab === "followers") {
        results = await db.follows
          .where("followingId")
          .equals(owner.id)
          .limit(50)
          .toArray()
      } else {
        results = await db.follows
          .where("followerId")
          .equals(owner.id)
          .limit(50)
          .toArray()
      }

      const userIds =
        tab === "followers"
          ? results.map(r => r.followerId)
          : results.map(r => r.followingId)

      const users = await db.users.bulkGet(userIds)

      setItems(users.filter(Boolean) as User[])
    })()
  }, [owner, tab])

  if (!owner) return <div className="p-4">User not found</div>

  return (
    <div className="max-w-md mx-auto p-4">
      {/* HEADER */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <h1 className="text-xl font-semibold mx-auto">@{owner.username}</h1>
      </div>

      {/* TABS */}
      <div className="flex border-b mb-3">
        <Link
          to={`/u/${owner.username}/followers`}
          className={`flex-1 text-center py-2 ${
            tab === "followers" ? "font-bold border-b-2 border-foreground" : "text-muted-foreground"
          }`}
        >
          Followers
        </Link>
        <Link
          to={`/u/${owner.username}/following`}
          className={`flex-1 text-center py-2 ${
            tab === "following" ? "font-bold border-b-2 border-foreground" : "text-muted-foreground"
          }`}
        >
          Following
        </Link>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search"
        className="mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className="space-y-4">
        {items
          .filter(u =>
            (u.username + (u.name ?? "")).toLowerCase().includes(search.toLowerCase())
          )
          .map(user => (
            <FollowListItem key={user.id} user={user} />
          ))}
      </div>
    </div>
  )
}

export default FollowPage
