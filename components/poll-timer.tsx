"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface PollTimerProps {
  endsAt: string
  onEnd?: () => void
}

export function PollTimer({ endsAt, onEnd }: PollTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [status, setStatus] = useState<"active" | "ended">("active")

  useEffect(() => {
    const updateTimer = () => {
      const endTime = new Date(endsAt).getTime()
      const now = Date.now()
      const diff = endTime - now

      if (diff <= 0) {
        setTimeLeft("Poll has ended")
        setStatus("ended")
        if (onEnd) onEnd()
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`)
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m ${seconds}s remaining`)
        } else {
          setTimeLeft(`${seconds}s remaining`)
        }

        setStatus("active")
      }
    }

    // Check if poll has already ended
    const endTime = new Date(endsAt).getTime()
    const now = Date.now()
    if (now > endTime) {
      setTimeLeft("Poll has ended")
      setStatus("ended")
      if (onEnd) onEnd()
      return
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [endsAt, onEnd])

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{timeLeft}</span>
      <Badge variant={status === "active" ? "default" : "secondary"} className="ml-2">
        {status === "active" ? "Active" : "Ended"}
      </Badge>
    </div>
  )
}

