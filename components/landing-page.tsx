"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Beyond <span className="text-primary">Binary</span> Politics
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover where you truly stand on the political spectrum with our nuanced approach to political ideology.
          </p>

          {/* Political Compass Visualization */}
          <div className="relative w-full max-w-md mx-auto aspect-square my-8">
            <div className="absolute inset-0 bg-muted/30 rounded-full"></div>
            <div className="absolute inset-[15%] bg-muted/50 rounded-full"></div>
            <div className="absolute inset-[30%] bg-muted/70 rounded-full"></div>
            <div className="absolute inset-[45%] bg-primary/20 rounded-full"></div>

            {/* Axes */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground/20"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground/20"></div>

            {/* Labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-medium">Authoritarian</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium">Libertarian</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium">Economic Left</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">Economic Right</div>

            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg max-w-2xl">
              Our test captures the <span className="font-semibold">nuances</span> of political ideology, including the
              distinction between centrist and radical centrist viewpoints.
            </p>

            <Link href="/surveys/political-compass">
              <Button size="lg" className="px-8 text-lg h-12 rounded-full">
                Take the Test <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground">Takes approximately 10 minutes to complete</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Our Test Different</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3 flex items-center">
                <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  1
                </span>
                Nuanced Spectrum
              </h3>
              <p className="text-muted-foreground">
                We measure your beliefs on a continuous scale, not just binary choices, capturing the full complexity of
                your political views.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-medium mb-3 flex items-center">
                <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  2
                </span>
                Centrist Distinction
              </h3>
              <p className="text-muted-foreground">
                Our test distinguishes between passive centrism and radical centrism, recognizing that not all moderate
                positions are the same.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-medium mb-3 flex items-center">
                <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  3
                </span>
                Multidimensional Analysis
              </h3>
              <p className="text-muted-foreground">
                Beyond the traditional left-right spectrum, we analyze your views across multiple dimensions of
                political thought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Answer Questions</h3>
                    <p className="text-muted-foreground">
                      Respond to a series of statements using our intuitive slider interface. Move the slider to
                      indicate your level of agreement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Get Your Results</h3>
                    <p className="text-muted-foreground">
                      We'll analyze your responses and plot your position on our multidimensional political compass.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Explore Your Ideology</h3>
                    <p className="text-muted-foreground">
                      Discover detailed insights about your political beliefs and how they compare to different
                      ideological frameworks.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/surveys/political-compass">
                <Button size="lg" className="px-8 text-lg h-12 rounded-full mt-8">
                  Start Now
                </Button>
              </Link>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-lg font-medium">Example Question:</p>
                  <p>The government should prioritize economic equality over economic freedom.</p>

                  <div className="mt-6 space-y-4">
                    {/* Custom slider example */}
                    <div className="relative pt-5 pb-5">
                      <div className="h-2 rounded-full bg-gradient-to-right from-primary/10 via-muted to-primary/10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-foreground/30"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-md"></div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Neutral</span>
                      <span>Strongly Agree</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Our slider interface allows you to express the exact degree of your agreement or disagreement,
                  capturing the nuance in your political views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to discover your true political position?</h2>
          <p className="text-muted-foreground">
            Join thousands of others who have gained deeper insights into their political beliefs.
          </p>
          <Link href="/surveys/political-compass">
            <Button size="lg" className="px-8 text-lg h-12 rounded-full">
              Begin the Test
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Political Compass Project. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="link" size="sm">
              About
            </Button>
            <Button variant="link" size="sm">
              Methodology
            </Button>
            <Button variant="link" size="sm">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

