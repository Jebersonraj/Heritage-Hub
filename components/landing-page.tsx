"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Clock, Globe, MessageSquare, ShieldCheck, Ticket, TrendingUp, Wallet } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function LandingPage() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Heritage Hub</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your museum experience with our intelligent chatbot ticketing system. Book tickets, skip
                    queues, and explore cultural heritage seamlessly.
                  </p>
                </div>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Our Museum Platform</h1>
                  <p className="text-lg mb-8 text-muted-foreground">Explore exhibitions, manage tickets, and more!</p>
                  <div className="space-x-4">
                    <a href="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90">
                      Log In
                    </a>
                    <a href="/signup" className="bg-secondary text-secondary-foreground px-6 py-2 rounded hover:bg-secondary/90">
                      Sign Up
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/chat">
                    <Button size="lg" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Book Tickets Now
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-md overflow-hidden rounded-xl border-0 shadow-lg">
                  <CardContent className="p-0">
                    <img
                      alt="Museum Exhibition"
                      className="aspect-video object-cover"
                      src="/main.jpg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Revolutionizing Museum Ticketing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our chatbot-driven system enhances visitor experience with real-time ticketing, multilingual support,
                  and secure payments.
                </p>
              </div>
            </div>

            <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="mt-12">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="features" className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <FeatureCard
                    icon={<Ticket />}
                    title="Real-Time Ticketing"
                    description="Instantaneous booking and confirmation, minimizing delays."
                  />
                  <FeatureCard
                    icon={<Globe />}
                    title="Multilingual Support"
                    description="Accommodates users from diverse linguistic backgrounds."
                  />
                  <FeatureCard
                    icon={<Wallet />}
                    title="UPI Payment"
                    description="Secure and reliable UPI payment with QR code for ticket purchases."
                  />
                  <FeatureCard
                    icon={<TrendingUp />}
                    title="Analytics Dashboard"
                    description="Insights on visitor demographics, ticket sales, and performance."
                  />
                  <FeatureCard
                    icon={<Clock />}
                    title="Queue Management"
                    description="Drastically cut down on queue times and overcrowding."
                  />
                  <FeatureCard
                    icon={<ShieldCheck />}
                    title="Secure & Scalable"
                    description="Proper authentication, data encryption, and future scalability."
                  />
                  <FeatureCard
                    icon={<MessageSquare />}
                    title="Chatbot Interface"
                    description="Intuitive conversation-based ticket booking experience."
                  />
                  <FeatureCard
                    icon={<Building2 />}
                    title="Museum Management"
                    description="Tools for museums to manage exhibitions, tickets and visitors."
                  />
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <BenefitCard
                    title="For Visitors"
                    benefits={[
                      "Skip long queues",
                      "Book tickets anytime, anywhere",
                      "Multilingual support",
                      "Easy payment options",
                      "Digital ticket management",
                    ]}
                  />
                  <BenefitCard
                    title="For Museums"
                    benefits={[
                      "Reduced operational costs",
                      "Valuable visitor insights",
                      "Improved visitor management",
                      "Enhanced visitor experience",
                      "Streamlined ticketing process",
                    ]}
                  />
                  <BenefitCard
                    title="For Management"
                    benefits={[
                      "Data-driven decision making",
                      "Real-time performance monitoring",
                      "Efficient resource allocation",
                      "Reduced manual errors",
                      "Scalable solution for growth",
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Museum Experience?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start using Heritage Hub today and provide your visitors with a seamless ticketing experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/chat">
                  <Button size="lg" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Try the Chatbot
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function BenefitCard({ title, benefits }: { title: string; benefits: string[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-3 text-lg font-semibold">{title}</h3>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

