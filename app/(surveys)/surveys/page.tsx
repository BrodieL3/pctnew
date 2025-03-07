import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SurveysPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Available Surveys</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">General Satisfaction Survey</h2>
          <p className="text-muted-foreground mb-4 flex-1">
            A comprehensive survey to measure customer satisfaction across multiple dimensions.
          </p>
          <Link href="/survey/satisfaction" className="mt-auto">
            <Button className="w-full">Take Survey</Button>
          </Link>
        </div>

        <div className="border rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Political Compass Test</h2>
          <p className="text-muted-foreground mb-4 flex-1">
            Discover where you stand on the political spectrum with our nuanced approach.
          </p>
          <Link href="/political-compass" className="mt-auto">
            <Button className="w-full">Take Test</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

