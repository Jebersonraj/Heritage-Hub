"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Filter, MapPin, MessageSquare, Search, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock museum data
const museums = [
  {
    id: "1",
    name: "National Museum of Art",
    description: "Explore the rich artistic heritage with over 5,000 artworks spanning centuries.",
    image: "/placeholder.svg",
    location: "Central District, New Delhi",
    rating: 4.8,
    hours: "9:00 AM - 5:00 PM",
    category: "art",
    popular: true,
  },
  {
    id: "2",
    name: "Natural History Museum",
    description:
      "Discover the wonders of natural history with extensive collections of fossils, minerals, and wildlife exhibits.",
    image: "/placeholder.svg",
    location: "Science Park, Mumbai",
    rating: 4.6,
    hours: "10:00 AM - 6:00 PM",
    category: "science",
    popular: true,
  },
  {
    id: "3",
    name: "Science & Technology Museum",
    description: "Interactive exhibits showcasing the evolution of science and technology through the ages.",
    image: "/placeholder.svg",
    location: "Tech Valley, Bangalore",
    rating: 4.7,
    hours: "9:00 AM - 7:00 PM",
    category: "science",
    popular: true,
  },
  {
    id: "4",
    name: "Modern Art Gallery",
    description: "Contemporary art from emerging and established artists from around the world.",
    image: "/placeholder.svg",
    location: "Arts District, Kolkata",
    rating: 4.5,
    hours: "11:00 AM - 8:00 PM",
    category: "art",
    popular: false,
  },
  {
    id: "5",
    name: "Archaeological Museum",
    description: "Ancient artifacts and archaeological discoveries from the Indian subcontinent.",
    image: "/placeholder.svg",
    location: "Heritage Zone, Chennai",
    rating: 4.4,
    hours: "9:00 AM - 5:00 PM",
    category: "history",
    popular: false,
  },
  {
    id: "6",
    name: "Maritime Museum",
    description: "Exhibits on naval history, maritime trade, and oceanography.",
    image: "/placeholder.svg",
    location: "Harbor District, Mumbai",
    rating: 4.3,
    hours: "10:00 AM - 6:00 PM",
    category: "history",
    popular: false,
  },
  {
    id: "7",
    name: "Cultural Heritage Museum",
    description: "Celebrating the diverse cultural heritage of India through artifacts, textiles, and performances.",
    image: "/placeholder.svg",
    location: "Cultural Center, Jaipur",
    rating: 4.7,
    hours: "9:00 AM - 6:00 PM",
    category: "culture",
    popular: true,
  },
  {
    id: "8",
    name: "Interactive Science Center",
    description: "Hands-on science exhibits designed for learning through play and experimentation.",
    image: "/placeholder.svg",
    location: "Education Park, Hyderabad",
    rating: 4.6,
    hours: "9:00 AM - 7:00 PM",
    category: "science",
    popular: false,
  },
]

export function MuseumListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter museums based on search query and category
  const filteredMuseums = museums.filter((museum) => {
    const matchesSearch =
      museum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      museum.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      museum.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || museum.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Filter museums for the "Popular" tab
  const popularMuseums = museums.filter((museum) => museum.popular)

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
            <h1 className="text-2xl font-bold">Explore Museums</h1>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search museums by name, description, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <div className="hidden md:flex gap-2">
                  <Button
                    variant={activeCategory === "art" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(activeCategory === "art" ? "all" : "art")}
                  >
                    Art
                  </Button>
                  <Button
                    variant={activeCategory === "science" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(activeCategory === "science" ? "all" : "science")}
                  >
                    Science
                  </Button>
                  <Button
                    variant={activeCategory === "history" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(activeCategory === "history" ? "all" : "history")}
                  >
                    History
                  </Button>
                  <Button
                    variant={activeCategory === "culture" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(activeCategory === "culture" ? "all" : "culture")}
                  >
                    Culture
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-2">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMuseums.map((museum) => (
                  <MuseumCard key={museum.id} museum={museum} />
                ))}
              </div>

              {filteredMuseums.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mt-4 text-lg font-semibold">No museums found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="mt-2">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {popularMuseums.map((museum) => (
                  <MuseumCard key={museum.id} museum={museum} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function MuseumCard({ museum }: { museum: (typeof museums)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={museum.image || "/placeholder.svg"}
          alt={museum.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{museum.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {museum.location}
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {museum.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">{museum.description}</p>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{museum.hours}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/museums/${museum.id}`}>
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

