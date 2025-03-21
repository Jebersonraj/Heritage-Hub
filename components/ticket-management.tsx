"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Download,
  QrCode,
  Search,
  Ticket,
  Trash2,
  User,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock ticket data
const mockTickets = [
  {
    id: "HH-123456",
    museum: "National Museum of Art",
    date: "2025-04-15",
    time: "10:00",
    adults: 2,
    children: 1,
    totalPrice: 38.0,
    status: "upcoming",
  },
  {
    id: "HH-789012",
    museum: "Natural History Museum",
    date: "2025-04-20",
    time: "14:00",
    adults: 1,
    children: 2,
    totalPrice: 31.0,
    status: "upcoming",
  },
  {
    id: "HH-345678",
    museum: "Science & Technology Museum",
    date: "2025-03-10",
    time: "11:00",
    adults: 2,
    children: 0,
    totalPrice: 30.0,
    status: "past",
  },
  {
    id: "HH-901234",
    museum: "Modern Art Gallery",
    date: "2025-03-05",
    time: "13:00",
    adults: 1,
    children: 1,
    totalPrice: 23.0,
    status: "past",
  },
]

export function TicketManagement() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<(typeof mockTickets)[0] | null>(null)

  // Filter tickets based on search query and tab
  const filterTickets = (status: string) => {
    return tickets
      .filter((ticket) => ticket.status === status)
      .filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.museum.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  // Handle ticket cancellation
  const handleCancelTicket = (ticketId: string) => {
    setTickets(tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "cancelled" } : ticket)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">My Tickets</h1>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tickets by ID or museum..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {filterTickets("upcoming").length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filterTickets("upcoming").map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onView={() => setSelectedTicket(ticket)}
                      onCancel={() => handleCancelTicket(ticket.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming tickets"
                  description="You don't have any upcoming museum visits. Book a ticket to get started."
                  action={
                    <Link href="/chat">
                      <Button className="gap-2">
                        <Ticket className="h-4 w-4" />
                        Book Tickets
                      </Button>
                    </Link>
                  }
                />
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {filterTickets("past").length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filterTickets("past").map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} onView={() => setSelectedTicket(ticket)} isPast />
                  ))}
                </div>
              ) : (
                <EmptyState title="No past tickets" description="You don't have any past museum visits." />
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6">
              {filterTickets("cancelled").length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filterTickets("cancelled").map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} onView={() => setSelectedTicket(ticket)} isCancelled />
                  ))}
                </div>
              ) : (
                <EmptyState title="No cancelled tickets" description="You don't have any cancelled museum visits." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Ticket Details Dialog */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
              <DialogDescription>Booking ID: {selectedTicket.id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-center py-4">
                <div className="bg-white p-4 rounded-lg">
                  <QrCode className="h-32 w-32 text-primary" />
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Museum:
                  </span>
                  <span className="font-medium">{selectedTicket.museum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date:
                  </span>
                  <span className="font-medium">{selectedTicket.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time:
                  </span>
                  <span className="font-medium">{selectedTicket.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Tickets:
                  </span>
                  <span className="font-medium">
                    {selectedTicket.adults} Adult{selectedTicket.adults !== 1 ? "s" : ""},{selectedTicket.children}{" "}
                    Child{selectedTicket.children !== 1 ? "ren" : ""}
                  </span>
                </div>
                <div className="pt-2 border-t flex justify-between">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">₹{selectedTicket.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge
                  variant={
                    selectedTicket.status === "upcoming"
                      ? "default"
                      : selectedTicket.status === "past"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </Badge>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => {}}>
                <Download className="h-4 w-4" />
                Download Ticket
              </Button>

              {selectedTicket.status === "upcoming" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2 w-full sm:w-auto">
                      <Trash2 className="h-4 w-4" />
                      Cancel Ticket
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Ticket</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this ticket? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, Keep Ticket</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleCancelTicket(selectedTicket.id)
                          setSelectedTicket(null)
                        }}
                      >
                        Yes, Cancel Ticket
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  )
}

function TicketCard({
  ticket,
  onView,
  onCancel,
  isPast = false,
  isCancelled = false,
}: {
  ticket: (typeof mockTickets)[0]
  onView: () => void
  onCancel?: () => void
  isPast?: boolean
  isCancelled?: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{ticket.museum}</CardTitle>
            <CardDescription>Booking ID: {ticket.id}</CardDescription>
          </div>
          <Badge variant={isCancelled ? "destructive" : isPast ? "secondary" : "default"}>
            {isCancelled ? "Cancelled" : isPast ? "Past" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Date:
            </span>
            <span>{ticket.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Time:
            </span>
            <span>{ticket.time}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <User className="h-4 w-4" />
              Tickets:
            </span>
            <span>
              {ticket.adults} Adult{ticket.adults !== 1 ? "s" : ""},{ticket.children} Child
              {ticket.children !== 1 ? "ren" : ""}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="font-medium">Total:</span>
            <span className="font-bold">₹{ticket.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="w-full" onClick={onView}>
          View Details
        </Button>
        {!isPast && !isCancelled && onCancel && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Cancel Ticket</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Ticket</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this ticket? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, Keep Ticket</AlertDialogCancel>
                <AlertDialogAction onClick={onCancel}>Yes, Cancel Ticket</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  )
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <AlertCircle className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

