export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Heritage Hub</h3>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Streamlining museum experiences with intelligent ticketing solutions.
          </p>
          <div className="mt-4 border-t pt-4 text-center text-sm text-muted-foreground w-full">
            <p>© {new Date().getFullYear()} Heritage Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

