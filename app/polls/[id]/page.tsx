"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PollPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [poll, setPoll] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

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
        clearInterval(interval)
        // Redirect to results page when poll ends
        router.push(`/polls/${params.id}/results`)
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [poll, params.id, router])

  const handleSubmit = async () => {
    if (!selectedOption) {
      setError("Please select an option")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would be an API call to submit the vote
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to results page after successful vote
      router.push(`/polls/${params.id}/results`)
    } catch (error) {
      setError("An error occurred while submitting your vote. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading poll...</p>
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
          <CardTitle className="text-2xl">{poll.question}</CardTitle>
          <CardDescription className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{timeLeft}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{poll.totalVotes} votes</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
            {poll.options.map((option: string, index: number) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                  selectedOption === option ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting || !selectedOption} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Want to see the current results without voting?</p>
        <Link href={`/polls/${params.id}/results`} className="text-primary hover:underline">
          View results
        </Link>
      </div>
    </div>
  )
}

