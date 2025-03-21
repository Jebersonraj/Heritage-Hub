import { NextResponse } from "next/server"
import { getActivePolls, getCompletedPolls } from "@/lib/redis"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") || "active"

    let polls
    if (type === "active") {
      polls = await getActivePolls()
    } else if (type === "completed") {
      polls = await getCompletedPolls()
    } else {
      return NextResponse.json({ error: "Invalid poll type" }, { status: 400 })
    }

    return NextResponse.json({ polls })
  } catch (error) {
    console.error("Error listing polls:", error)
    return NextResponse.json({ error: "Failed to list polls" }, { status: 500 })
  }
}

