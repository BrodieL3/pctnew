import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-background rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <h3 className="text-2xl font-semibold mb-4">Page Not Found</h3>
        <p className="text-muted-foreground mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}

