import Redis from "ioredis"

// Fix Redis URL for Upstash
export function fixUrl(url: string | undefined) {
  if (!url) return ""
  // Replace redis:// with rediss:// for TLS connections
  return url.replace(/^redis:\/\//, "rediss://")
}

// Create Redis client
let redis: Redis | null = null

export function getRedisClient() {
  if (!redis) {
    redis = new Redis(fixUrl(process.env.REDIS_URL || ""))
  }
  return redis
}

// Poll functions
export async function createPoll(question: string, options: string[], durationMinutes: number) {
  const client = getRedisClient()

  const pollId = `poll:${Date.now()}`
  const now = Date.now()
  const endsAt = now + durationMinutes * 60 * 1000

  // Store poll data
  await client.hset(pollId, {
    question,
    options: JSON.stringify(options),
    createdAt: now.toString(),
    endsAt: endsAt.toString(),
  })

  // Initialize votes for each option
  for (let i = 0; i < options.length; i++) {
    await client.hset(`${pollId}:votes`, options[i], "0")
  }

  // Add to active polls list
  await client.zadd("active_polls", endsAt, pollId)

  return pollId
}

export async function getPoll(pollId: string) {
  const client = getRedisClient()

  const pollData = await client.hgetall(pollId)
  if (!pollData || Object.keys(pollData).length === 0) {
    return null
  }

  const votesData = await client.hgetall(`${pollId}:votes`)

  const options = JSON.parse(pollData.options)
  const votes = options.map((option: string) => Number.parseInt(votesData[option] || "0"))
  const totalVotes = votes.reduce((sum: number, count: number) => sum + count, 0)

  return {
    id: pollId,
    question: pollData.question,
    options,
    votes,
    totalVotes,
    createdAt: pollData.createdAt,
    endsAt: pollData.endsAt,
  }
}

export async function voteOnPoll(pollId: string, option: string) {
  const client = getRedisClient()

  // Check if poll exists and is active
  const pollData = await client.hgetall(pollId)
  if (!pollData || Object.keys(pollData).length === 0) {
    throw new Error("Poll not found")
  }

  const now = Date.now()
  const endsAt = Number.parseInt(pollData.endsAt)

  if (now > endsAt) {
    throw new Error("Poll has ended")
  }

  // Increment vote count for the selected option
  await client.hincrby(`${pollId}:votes`, option, 1)

  return true
}

export async function getActivePolls() {
  const client = getRedisClient()

  const now = Date.now()

  // Get active poll IDs
  const pollIds = await client.zrangebyscore("active_polls", now, "+inf")

  // Get poll data for each ID
  const polls = await Promise.all(pollIds.map((id) => getPoll(id)))

  return polls.filter(Boolean)
}

export async function getCompletedPolls() {
  const client = getRedisClient()

  const now = Date.now()

  // Get completed poll IDs
  const pollIds = await client.zrangebyscore("active_polls", "-inf", now)

  // Get poll data for each ID
  const polls = await Promise.all(pollIds.map((id) => getPoll(id)))

  return polls.filter(Boolean)
}

