"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PollResultsPage({ params }: { params: { id: string } }) {
  const [poll, setPoll] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [pollStatus, setPollStatus] = useState<"active" | "ended">("active")

  // Mock data for the poll
  useEffect(() => {
    // In a real app, this would be an API call to fetch the poll data
    const mockPoll = {
      id: params.id,
      question: "What framework should we use for our next project?",
      options: ["Next.js", "Remix", "Astro", "SvelteKit"],
      votes: [42, 18, 15, 25],
      totalVotes: 100,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      endsAt: new Date(Date.now() + 3600000 * 5).toISOString(),
    }

    setPoll(mockPoll)
    setIsLoading(false)
  }, [params.id])

  useEffect(() => {
    if (!poll) return

    // Update time left
    const interval = setInterval(() => {
      const endTime = new Date(poll.endsAt).getTime()
      const now = Date.now()
      const diff = endTime - now

      if (diff <= 0) {
        setTimeLeft("Poll has ended")
        setPollStatus("ended")
        clearInterval(interval)
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`)
        setPollStatus("active")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [poll])

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="container max-w-3xl py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Poll not found</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{poll.question}</CardTitle>
            <Badge variant={pollStatus === "active" ? "default" : "secondary"}>
              {pollStatus === "active" ? "Active" : "Ended"}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{pollStatus === "active" ? timeLeft : "Poll has ended"}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{poll.totalVotes} votes</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">Results</h3>
            {poll.options.map((option: string, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm">
                  <span>{option}</span>
                  <span className="text-muted-foreground">
                    {poll.votes[index]} votes ({Math.round((poll.votes[index] / poll.totalVotes) * 100)}%)
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(poll.votes[index] / poll.totalVotes) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        {pollStatus === "active" && (
          <CardFooter>
            <Link href={`/polls/${params.id}`} className="w-full">
              <Button className="w-full">Back to Poll</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

