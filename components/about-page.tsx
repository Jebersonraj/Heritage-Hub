import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Building2, Clock, MessageSquare, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">About Heritage Hub</h1>
          </div>

          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5"></div>
              <div className="relative p-8 md:p-12">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Mission</h2>
                <p className="max-w-3xl text-lg text-muted-foreground">
                  Heritage Hub is dedicated to making cultural experiences more accessible through innovative ticketing
                  solutions. We believe that everyone should have the opportunity to explore and appreciate our shared
                  cultural heritage without barriers.
                </p>
              </div>
            </div>

            {/* About Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                Heritage Hub was founded in 2023 with a simple goal: to revolutionize how people access museums and
                cultural institutions. Our chatbot-driven ticketing system streamlines the booking process, reduces wait
                times, and enhances the overall visitor experience.
              </p>

              <h3>What We Offer</h3>
              <p>
                Our platform connects visitors with museums through an intuitive, conversation-based interface. Whether
                you're planning a visit to a world-renowned art gallery or a local historical museum, Heritage Hub makes
                it easy to find information, book tickets, and manage your cultural experiences.
              </p>

              <div className="my-8 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Intelligent Chatbot</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI-powered chatbot provides personalized assistance in multiple languages, helping you find
                      the perfect museum experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Queue Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Skip the lines with our digital ticketing system, allowing you to make the most of your museum
                      visit.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3>Our Partners</h3>
              <p>
                We collaborate with museums and cultural institutions across the country to provide seamless ticketing
                solutions. Our partners include national museums, art galleries, science centers, and historical sites.
              </p>

              <div className="my-8 grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center">
                  <Building2 className="h-12 w-12 text-primary mb-2" />
                  <p className="text-center font-medium">National Museum of Art</p>
                </div>
                <div className="flex flex-col items-center">
                  <Building2 className="h-12 w-12 text-primary mb-2" />
                  <p className="text-center font-medium">Natural History Museum</p>
                </div>
                <div className="flex flex-col items-center">
                  <Building2 className="h-12 w-12 text-primary mb-2" />
                  <p className="text-center font-medium">Science & Technology Museum</p>
                </div>
              </div>

              <h3>Our Team</h3>
              <p>
                Heritage Hub is powered by a dedicated team of museum enthusiasts, technology experts, and customer
                service professionals. We're united by our passion for making cultural experiences more accessible to
                everyone.
              </p>

              <div className="my-8 flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-6">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-center text-lg font-medium">A team of passionate professionals</p>
                  <p className="text-center text-sm text-muted-foreground">
                    Working together to enhance cultural experiences
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-lg bg-primary/5 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold">Ready to Experience Heritage Hub?</h3>
              <p className="mb-6 text-muted-foreground">
                Start booking museum tickets with our intelligent chatbot today.
              </p>
              <Link href="/chat">
                <Button size="lg" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Try the Chatbot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

