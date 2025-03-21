import { NextResponse } from "next/server"
import { voteOnPoll } from "@/lib/redis"

export async function POST(request: Request) {
  try {
    const { pollId, option } = await request.json()

    // Validate input
    if (!pollId) {
      return NextResponse.json({ error: "Poll ID is required" }, { status: 400 })
    }

    if (!option) {
      return NextResponse.json({ error: "Option is required" }, { status: 400 })
    }

    // Submit vote
    await voteOnPoll(pollId, option)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error voting on poll:", error)
    return NextResponse.json({ error: error.message || "Failed to submit vote" }, { status: 500 })
  }
}

