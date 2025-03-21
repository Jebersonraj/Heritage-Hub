"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calendar, Clock, Loader2, MessageSquare, MinusCircle, Send, Ticket, User, X } from "lucide-react";
import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Types for our chat messages
type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

// Types for ticket booking state
type TicketBookingState = {
  museum?: string;
  date?: string;
  time?: string;
  adults?: number;
  children?: number;
  totalPrice?: number;
  paymentMethod?: string;
  status?: "selecting" | "confirming" | "payment" | "complete";
};

// Initialize Gemini
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; // Use NEXT_PUBLIC_ for client-side
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Adjust model as needed

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Heritage Hub assistant. How can I help you with museum tickets today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [bookingState, setBookingState] = useState<TicketBookingState>({
    status: "selecting",
  });
  const [showTicketPanel, setShowTicketPanel] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Process the message to determine intent
      if (
          input.toLowerCase().includes("ticket") ||
          input.toLowerCase().includes("book") ||
          input.toLowerCase().includes("museum")
      ) {
        // Start ticket booking flow
        setShowTicketPanel(true);
        setBookingState({
          status: "selecting",
          museum: "National Museum of Art",
          adults: 1,
          children: 0,
          totalPrice: 15.0,
        });

        const response: MessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'd be happy to help you book museum tickets! Please select your preferences in the ticket panel.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      } else {
        // Use Gemini to generate a response
        const prompt = `User: ${input}\nYou are a helpful museum ticketing assistant. Respond in ${language}.`;
        const systemPrompt =
            "You are a helpful museum ticketing assistant for Heritage Hub. Keep responses concise and focused on helping users book museum tickets, learn about exhibitions, or get information about museums. If users want to book tickets, guide them to use the booking system.";

        const result = await model.generateContent(`${systemPrompt}\n${prompt}`);
        const text = result.response.text();

        const response: MessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: text,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle ticket booking steps
  const handleContinueBooking = () => {
    if (bookingState.status === "selecting") {
      setBookingState({ ...bookingState, status: "confirming" });
    } else if (bookingState.status === "confirming") {
      setBookingState({ ...bookingState, status: "payment" });
      setShowPaymentQR(true);
    } else if (bookingState.status === "payment") {
      // Simulate payment completion
      setBookingState({ ...bookingState, status: "complete" });
      setShowPaymentQR(false);

      const confirmationMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
            "Great news! Your payment has been confirmed. Your tickets have been booked successfully. You can view your tickets in the 'My Tickets' section.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirmationMessage]);
    }
  };

  // Handle updating ticket details
  const updateTicketDetails = (field: string, value: any) => {
    setBookingState((prev) => {
      const updated = { ...prev, [field]: value };

      // Recalculate price when adults or children change
      if (field === "adults" || field === "children") {
        const adultPrice = 15;
        const childPrice = 8;
        updated.totalPrice = (updated.adults || 0) * adultPrice + (updated.children || 0) * childPrice;
      }

      return updated;
    });
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);

    // Add a system message about language change
    const languageMessage: MessageType = {
      id: Date.now().toString(),
      role: "system",
      content: `Language changed to ${value}. The assistant will now respond in ${value}.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, languageMessage]);
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  // Toggle chat expanded/collapsed
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <>
        {/* Floating Action Button */}
        <Button className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg h-14 w-14 p-0" onClick={toggleChat}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>

        {/* Floating Chat Window */}
        {isOpen && (
            <div
                ref={chatRef}
                className={`fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                    isExpanded ? "h-[80vh]" : "h-[500px]"
                }`}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Heritage Hub Assistant
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-8 w-8">
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <div className="flex flex-1 overflow-hidden">
                  {/* Chat Messages */}
                  <div className={`flex-1 overflow-hidden ${showTicketPanel ? "hidden md:block md:w-1/2" : "w-full"}`}>
                    <div className="flex h-9 items-center justify-between border-b px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Language:</span>
                        <Select value={language} onValueChange={handleLanguageChange}>
                          <SelectTrigger className="h-7 w-[120px] text-xs">
                            <SelectValue placeholder="Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="h-[calc(100%-80px)] overflow-y-auto space-y-4 p-4">
                      {messages.map((message) => (
                          <div
                              key={message.id}
                              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : message.role === "system"
                                            ? "bg-muted text-muted-foreground text-sm italic"
                                            : "bg-secondary text-secondary-foreground"
                                }`}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              <p className="mt-1 text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                      ))}
                      {isLoading && (
                          <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg bg-secondary px-4 py-2 text-secondary-foreground">
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <p>Thinking...</p>
                              </div>
                            </div>
                          </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t p-2">
                      <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Panel */}
                  {showTicketPanel && (
                      <div className={`${showTicketPanel ? "w-full md:w-1/2" : "hidden"} border-l`}>
                        <div className="flex h-9 items-center justify-between border-b px-4">
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Ticket className="h-3 w-3" />
                      Ticket Booking
                    </span>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowTicketPanel(false)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="h-[calc(100%-80px)] overflow-y-auto p-4">
                          {bookingState.status === "selecting" && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Museum</label>
                                  <Select
                                      value={bookingState.museum}
                                      onValueChange={(value) => updateTicketDetails("museum", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select museum" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="National Museum of Art">National Museum of Art</SelectItem>
                                      <SelectItem value="Natural History Museum">Natural History Museum</SelectItem>
                                      <SelectItem value="Science & Technology Museum">Science & Technology Museum</SelectItem>
                                      <SelectItem value="Modern Art Gallery">Modern Art Gallery</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Date</label>
                                  <Input
                                      type="date"
                                      value={bookingState.date}
                                      onChange={(e) => updateTicketDetails("date", e.target.value)}
                                      min={new Date().toISOString().split("T")[0]}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Time</label>
                                  <Select
                                      value={bookingState.time}
                                      onValueChange={(value) => updateTicketDetails("time", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="09:00">09:00 AM</SelectItem>
                                      <SelectItem value="10:00">10:00 AM</SelectItem>
                                      <SelectItem value="11:00">11:00 AM</SelectItem>
                                      <SelectItem value="12:00">12:00 PM</SelectItem>
                                      <SelectItem value="13:00">01:00 PM</SelectItem>
                                      <SelectItem value="14:00">02:00 PM</SelectItem>
                                      <SelectItem value="15:00">03:00 PM</SelectItem>
                                      <SelectItem value="16:00">04:00 PM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Adults</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={bookingState.adults}
                                        onChange={(e) => updateTicketDetails("adults", Number.parseInt(e.target.value))}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Children</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={bookingState.children}
                                        onChange={(e) => updateTicketDetails("children", Number.parseInt(e.target.value))}
                                    />
                                  </div>
                                </div>
                              </div>
                          )}

                          {bookingState.status === "confirming" && (
                              <div className="space-y-4">
                                <h3 className="font-medium">Booking Summary</h3>
                                <div className="rounded-lg bg-muted p-4 space-y-2">
                                  <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Museum:
                            </span>
                                    <span className="font-medium">{bookingState.museum}</span>
                                  </div>
                                  <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Date:
                            </span>
                                    <span className="font-medium">{bookingState.date}</span>
                                  </div>
                                  <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Time:
                            </span>
                                    <span className="font-medium">{bookingState.time}</span>
                                  </div>
                                  <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Tickets:
                            </span>
                                    <span className="font-medium">
                              {bookingState.adults} Adult{bookingState.adults !== 1 ? "s" : ""},{bookingState.children}{" "}
                                      Child{bookingState.children !== 1 ? "ren" : ""}
                            </span>
                                  </div>
                                  <div className="pt-2 border-t flex justify-between">
                                    <span className="font-medium">Total Price:</span>
                                    <span className="font-bold">₹{bookingState.totalPrice?.toFixed(2)}</span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Payment Method</label>
                                  <Select
                                      value={bookingState.paymentMethod}
                                      onValueChange={(value) => updateTicketDetails("paymentMethod", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="upi">UPI</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                          )}

                          {bookingState.status === "payment" && (
                              <div className="space-y-4">
                                <h3 className="font-medium text-center">Scan QR Code to Pay</h3>
                                <div className="flex justify-center">
                                  <div className="bg-white p-4 rounded-lg">
                                    <img src="/placeholder.svg?height=200&width=200" alt="UPI QR Code" className="w-48 h-48" />
                                  </div>
                                </div>
                                <p className="text-center text-sm text-muted-foreground">
                                  Amount: ₹{bookingState.totalPrice?.toFixed(2)}
                                </p>
                                <p className="text-center text-sm text-muted-foreground">UPI ID: heritagehub@upi</p>
                              </div>
                          )}

                          {bookingState.status === "complete" && (
                              <div className="space-y-4">
                                <div className="rounded-lg bg-primary/10 p-4 text-center">
                                  <h3 className="font-medium text-primary mb-2">Booking Confirmed!</h3>
                                  <p className="text-sm">
                                    Your tickets have been booked successfully. A confirmation has been sent to your email.
                                  </p>
                                </div>

                                <div className="rounded-lg bg-muted p-4 space-y-2">
                                  <div className="flex justify-between">
                                    <span>Booking ID:</span>
                                    <span className="font-medium">HH-{Math.floor(100000 + Math.random() * 900000)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Museum:</span>
                                    <span className="font-medium">{bookingState.museum}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Date & Time:</span>
                                    <span className="font-medium">
                              {bookingState.date} at {bookingState.time}
                            </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Tickets:</span>
                                    <span className="font-medium">
                              {bookingState.adults} Adult{bookingState.adults !== 1 ? "s" : ""},{bookingState.children}{" "}
                                      Child{bookingState.children !== 1 ? "ren" : ""}
                            </span>
                                  </div>
                                </div>

                                <div className="flex justify-center">
                                  <Link href="/tickets">
                                    <Button variant="outline" className="gap-2">
                                      <Ticket className="h-4 w-4" />
                                      View My Tickets
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                          )}
                        </div>

                        {bookingState.status !== "complete" && (
                            <div className="border-t p-2 flex justify-between">
                              {bookingState.status !== "selecting" ? (
                                  <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                          setBookingState({
                                            ...bookingState,
                                            status: bookingState.status === "payment" ? "confirming" : "selecting",
                                          })
                                      }
                                  >
                                    Back
                                  </Button>
                              ) : (
                                  <Button variant="outline" size="sm" onClick={() => setShowTicketPanel(false)}>
                                    Cancel
                                  </Button>
                              )}

                              <Button
                                  size="sm"
                                  onClick={handleContinueBooking}
                                  disabled={
                                      (bookingState.status === "selecting" &&
                                          (!bookingState.museum ||
                                              !bookingState.date ||
                                              !bookingState.time ||
                                              !bookingState.adults)) ||
                                      (bookingState.status === "confirming" && !bookingState.paymentMethod)
                                  }
                              >
                                {bookingState.status === "selecting"
                                    ? "Continue"
                                    : bookingState.status === "confirming"
                                        ? "Proceed to Payment"
                                        : "Confirm Payment"}
                              </Button>
                            </div>
                        )}
                      </div>
                  )}
                </div>
              </Card>
            </div>
        )}
      </>
  );
}