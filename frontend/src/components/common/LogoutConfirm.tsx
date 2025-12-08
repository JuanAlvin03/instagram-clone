import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LogoutConfirmProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function LogoutConfirm({ open, onCancel, onConfirm }: LogoutConfirmProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-80">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Log out?</h2>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out?
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Log out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
