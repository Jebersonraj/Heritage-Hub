"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Calendar, Filter, MessageSquare, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock exhibition data
const exhibitions = [
  {
    id: "1",
    title: "Renaissance Masterpieces",
    description: "A collection of Renaissance art masterpieces from around the world.",
    image: "/1.jpg",
    museum: "National Museum of Art",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: "current",
    featured: true,
  },
  {
    id: "2",
    title: "Dinosaurs: Giants of the Past",
    description: "Explore the fascinating world of dinosaurs through fossils and interactive displays.",
    image: "/2.jpg",
    museum: "Natural History Museum",
    startDate: "2025-03-15",
    endDate: "2025-08-15",
    status: "current",
    featured: true,
  },
  {
    id: "3",
    title: "Space Exploration: Journey to the Stars",
    description: "An immersive exhibition on space exploration and the future of interstellar travel.",
    image: "3.jpg",
    museum: "Science & Technology Museum",
    startDate: "2025-05-01",
    endDate: "2025-09-30",
    status: "upcoming",
    featured: true,
  },
  {
    id: "4",
    title: "Contemporary Visions",
    description: "Showcasing works from emerging contemporary artists pushing boundaries in modern art.",
    image: "/6.jpg",
    museum: "Modern Art Gallery",
    startDate: "2025-04-15",
    endDate: "2025-07-15",
    status: "upcoming",
    featured: false,
  },
  {
    id: "5",
    title: "Ancient Civilizations",
    description: "Artifacts and stories from ancient civilizations that shaped human history.",
    image: "/5.jpg",
    museum: "Archaeological Museum",
    startDate: "2025-02-01",
    endDate: "2025-05-30",
    status: "current",
    featured: false,
  },
  {
    id: "6",
    title: "Ocean Wonders",
    description: "Discover the mysteries of the deep sea and marine life through interactive exhibits.",
    image: "/7.jpg",
    museum: "Maritime Museum",
    startDate: "2025-06-01",
    endDate: "2025-10-31",
    status: "upcoming",
    featured: false,
  },
  {
    id: "7",
    title: "Textile Traditions of India",
    description: "A celebration of India's rich textile heritage from different regions.",
    image: "/4.jpg",
    museum: "Cultural Heritage Museum",
    startDate: "2025-03-01",
    endDate: "2025-06-15",
    status: "current",
    featured: true,
  },
  {
    id: "8",
    title: "The Science of Lights",
    description: "Interactive exhibits exploring the properties and applications of light in science and art.",
    image: "/8.jpg",
    museum: "Interactive Science Center",
    startDate: "2025-05-15",
    endDate: "2025-08-30",
    status: "upcoming",
    featured: false,
  },
]

export function ExhibitionListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState("all")

  // Filter exhibitions based on search query and status
  const filteredExhibitions = exhibitions.filter((exhibition) => {
    const matchesSearch =
      exhibition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibition.museum.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = activeStatus === "all" || exhibition.status === activeStatus

    return matchesSearch && matchesStatus
  })

  // Filter exhibitions for the "Featured" category
  const featuredExhibitions = exhibitions.filter((exhibition) => exhibition.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Exhibitions</h1>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search exhibitions by title, description, or museum..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <Button
                variant={activeStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStatus("all")}
              >
                All
              </Button>
              <Button
                variant={activeStatus === "current" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStatus("current")}
              >
                Current
              </Button>
              <Button
                variant={activeStatus === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStatus("upcoming")}
              >
                Upcoming
              </Button>
            </div>

            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Featured Exhibitions */}
          {activeStatus === "all" && searchQuery === "" && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Exhibitions</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredExhibitions.map((exhibition) => (
                  <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
                ))}
              </div>
            </div>
          )}

          {/* All Exhibitions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {activeStatus === "all"
                ? "All Exhibitions"
                : activeStatus === "current"
                  ? "Current Exhibitions"
                  : "Upcoming Exhibitions"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExhibitions.map((exhibition) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>

            {filteredExhibitions.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="mt-4 text-lg font-semibold">No exhibitions found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ExhibitionCard({ exhibition }: { exhibition: (typeof exhibitions)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={exhibition.image || "/placeholder.svg"}
          alt={exhibition.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{exhibition.title}</CardTitle>
            <CardDescription className="mt-1">{exhibition.museum}</CardDescription>
          </div>
          <Badge variant={exhibition.status === "current" ? "default" : "secondary"}>
            {exhibition.status === "current" ? "Current" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">{exhibition.description}</p>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>
            {new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/exhibitions/${exhibition.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Link href="/chat">
          <Button className="gap-1">
            <MessageSquare className="h-4 w-4" />
            Book Tickets
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

