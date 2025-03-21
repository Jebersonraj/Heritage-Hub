import { NextResponse } from "next/server"
import { getPoll } from "@/lib/redis"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const pollId = url.searchParams.get("id")

    if (!pollId) {
      return NextResponse.json({ error: "Poll ID is required" }, { status: 400 })
    }

    const poll = await getPoll(pollId)

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 })
    }

    return NextResponse.json({ poll })
  } catch (error) {
    console.error("Error getting poll:", error)
    return NextResponse.json({ error: "Failed to get poll" }, { status: 500 })
  }
}

