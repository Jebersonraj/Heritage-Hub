"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogIn, LogOut, Menu, User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be replaced with actual auth state
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav setIsOpen={setIsOpen} isLoggedIn={isLoggedIn} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Heritage Hub</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/museums"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/museums" ? "text-primary" : ""}`}
          >
            Museums
          </Link>
          <Link
            href="/exhibitions"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/exhibitions" ? "text-primary" : ""}`}
          >
            Exhibitions
          </Link>
          <Link
            href="/tickets"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/tickets" ? "text-primary" : ""}`}
          >
            My Tickets
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="mr-1">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Link href="/logout" className="hidden md:block">
                <Button variant="outline" size="sm" className="gap-1">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

function MobileNav({
  setIsOpen,
  isLoggedIn,
}: {
  setIsOpen: (open: boolean) => void
  isLoggedIn: boolean
}) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/museums"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        Museums
      </Link>
      <Link
        href="/exhibitions"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        Exhibitions
      </Link>
      <Link
        href="/tickets"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        My Tickets
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            href="/profile"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/logout"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <Button variant="outline" size="sm" className="gap-1 mt-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </>
      ) : (
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          <Button variant="outline" size="sm" className="gap-1 mt-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </Link>
      )}
    </div>
  )
}

