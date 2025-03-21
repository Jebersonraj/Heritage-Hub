import { NextResponse } from "next/server"
import { createPoll } from "@/lib/redis"

export async function POST(request: Request) {
  try {
    const { question, options, duration } = await request.json()

    // Validate input
    if (!question || !question.trim()) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    if (!options || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: "At least 2 options are required" }, { status: 400 })
    }

    const validOptions = options.filter((option) => option && option.trim() !== "")
    if (validOptions.length < 2) {
      return NextResponse.json({ error: "At least 2 non-empty options are required" }, { status: 400 })
    }

    if (!duration || isNaN(Number.parseInt(duration))) {
      return NextResponse.json({ error: "Valid duration is required" }, { status: 400 })
    }

    // Create poll
    const pollId = await createPoll(question, validOptions, Number.parseInt(duration))

    return NextResponse.json({ success: true, pollId })
  } catch (error) {
    console.error("Error creating poll:", error)
    return NextResponse.json({ error: "Failed to create poll" }, { status: 500 })
  }
}

