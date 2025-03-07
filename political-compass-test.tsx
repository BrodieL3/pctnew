"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react"
import { CustomSlider } from "./custom-slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Political compass test questions
const questions = [
  "The government should prioritize economic equality over economic freedom.",
  "Individual liberty should be valued above social order and stability.",
  "Free markets are more efficient than government-managed economies.",
  "Social welfare programs are essential for a just society.",
  "Traditional values and institutions should be preserved.",
  "Environmental regulations should be strengthened, even at the cost of economic growth.",
  "Military spending should be increased to ensure national security.",
  "Immigration policies should be more open and welcoming.",
  "The death penalty is a justified punishment for certain crimes.",
  "Healthcare should be provided as a public service rather than through private markets.",
  "Religious principles should guide government policies.",
  "Labor unions are necessary to protect workers' rights.",
  "Taxation of the wealthy should be increased to fund social programs.",
  "Government surveillance is justified for national security purposes.",
  "International cooperation should be prioritized over national sovereignty.",
  "Corporate regulations should be reduced to promote economic growth.",
  "Same-sex marriage should be legally recognized.",
  "Public education should receive more government funding.",
  "Gun ownership is a fundamental right that should be protected.",
  "The use of military force is justified to promote democracy abroad.",
  "Abortion should be legally accessible.",
  "Privatization of public services leads to greater efficiency.",
  "Freedom of speech should include the right to express offensive views.",
  "Wealth inequality is a serious problem that government should address.",
  "Globalization benefits society overall.",
  "Criminal justice should focus more on rehabilitation than punishment.",
  "Government should play a minimal role in regulating the economy.",
  "Technological progress should be regulated to protect jobs and privacy.",
  "National identity and culture should be preserved in the face of globalization.",
  "Direct democracy is preferable to representative democracy.",
]

// Likert scale options mapped to slider values
const getResponseLabel = (value: number) => {
  if (value < 12.5) return "Strongly Disagree"
  if (value < 25) return "Disagree"
  if (value < 37.5) return "Somewhat Disagree"
  if (value < 50) return "Slightly Disagree"
  if (value === 50) return "Neutral"
  if (value < 62.5) return "Slightly Agree"
  if (value < 75) return "Somewhat Agree"
  if (value < 87.5) return "Agree"
  return "Strongly Agree"
}

// Sample data for MDS visualization
const sampleRespondents = [
  { id: 1, label: "Liberal", position: [-80, -60], responses: {} },
  { id: 2, label: "Conservative", position: [70, 50], responses: {} },
  { id: 3, label: "Libertarian", position: [60, -70], responses: {} },
  { id: 4, label: "Authoritarian", position: [-40, 80], responses: {} },
  { id: 5, label: "Centrist", position: [0, 0], responses: {} },
  { id: 6, label: "Progressive", position: [-60, -30], responses: {} },
  { id: 7, label: "Traditional", position: [40, 30], responses: {} },
  { id: 8, label: "Radical Centrist", position: [10, -5], responses: {} },
  { id: 9, label: "Nationalist", position: [30, 60], responses: {} },
  { id: 10, label: "Globalist", position: [-50, -20], responses: {} },
]

export default function PoliticalCompassTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [userMdsPosition, setUserMdsPosition] = useState<[number, number]>([0, 0])
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = questionRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1 && index !== currentQuestion) {
              setCurrentQuestion(index)
            }
          }
        })
      },
      { threshold: 0.7 },
    )

    questionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      questionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [questionRefs.current.length])

  const handleResponse = (questionIndex: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }))
  }

  const handleSubmit = () => {
    console.log("Test responses:", responses)

    // Simulate MDS calculation based on responses
    // In a real implementation, this would use actual MDS algorithms
    const calculateMdsPosition = () => {
      // Get average deviation from neutral (50)
      const deviations = Object.values(responses).map((val) => val - 50)
      const avgDeviation = deviations.reduce((sum, val) => sum + Math.abs(val), 0) / deviations.length

      // Calculate a position based on response patterns
      // This is a simplified simulation of MDS
      const xBias =
        Object.entries(responses)
          .filter(([key]) => [2, 3, 9, 12, 15, 21, 24, 26].includes(Number.parseInt(key)))
          .reduce((sum, [_, val]) => sum + (val - 50), 0) / 8

      const yBias =
        Object.entries(responses)
          .filter(([key]) => [1, 4, 7, 10, 13, 19, 22, 28].includes(Number.parseInt(key)))
          .reduce((sum, [_, val]) => sum + (val - 50), 0) / 8

      // Add some randomness to simulate the complexity of MDS
      const randomFactor = 15
      const x = xBias + (Math.random() * randomFactor - randomFactor / 2)
      const y = yBias + (Math.random() * randomFactor - randomFactor / 2)

      return [x, y] as [number, number]
    }

    setUserMdsPosition(calculateMdsPosition())
    setSubmitted(true)
  }

  const scrollToQuestion = (index: number) => {
    setIsAnimating(true)
    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (submitted) {
    // Calculate political position based on responses
    // This is a simplified example - a real implementation would use more complex algorithms

    // Calculate economic axis (left-right)
    const economicQuestions = [0, 2, 9, 11, 12, 15, 21, 23, 26]
    const economicScore = economicQuestions.reduce((sum, q) => sum + (responses[q] || 50), 0) / economicQuestions.length
    const economicPosition = ((economicScore - 50) / 50) * 100 // -100 to 100 scale

    // Calculate social axis (libertarian-authoritarian)
    const socialQuestions = [1, 4, 6, 7, 10, 13, 16, 19, 20, 22, 25, 28]
    const socialScore = socialQuestions.reduce((sum, q) => sum + (responses[q] || 50), 0) / socialQuestions.length
    const socialPosition = ((socialScore - 50) / 50) * 100 // -100 to 100 scale

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/5">
        <div className="w-full max-w-3xl mx-auto p-8 text-center space-y-10">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">Your Political Compass Results</h1>

          {/* Traditional Political Compass Visualization */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Traditional Political Compass</h2>
            <div className="relative w-full max-w-md mx-auto aspect-square my-8 border rounded-lg">
              {/* Axes */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground/20"></div>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground/20"></div>

              {/* Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-medium">Authoritarian</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium">Libertarian</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium">Economic Left</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">Economic Right</div>

              {/* User position */}
              <div
                className="absolute w-6 h-6 bg-primary rounded-full"
                style={{
                  left: `${50 + economicPosition / 2}%`,
                  top: `${50 - socialPosition / 2}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="absolute w-12 h-12 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${50 + economicPosition / 2}%`,
                  top: `${50 - socialPosition / 2}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
          </div>

          {/* MDS Visualization */}
          <div className="mt-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">Multi-Dimensional Scaling Analysis</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      This visualization shows how your political views compare to others based on your complete
                      response profile, not just two dimensions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="relative w-full max-w-md mx-auto aspect-square my-8 border rounded-lg bg-muted/5">
              {/* MDS visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-full">
                  {/* Concentric circles for reference */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-foreground/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-dashed border-foreground/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-dashed border-foreground/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] border border-dashed border-foreground/10 rounded-full"></div>

                  {/* Sample respondents */}
                  {sampleRespondents.map((respondent) => (
                    <div
                      key={respondent.id}
                      className="absolute w-3 h-3 bg-foreground/40 rounded-full"
                      style={{
                        left: `${50 + respondent.position[0] / 2}%`,
                        top: `${50 - respondent.position[1] / 2}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-foreground/60">
                        {respondent.label}
                      </div>
                    </div>
                  ))}

                  {/* User position */}
                  <div
                    className="absolute w-6 h-6 bg-primary rounded-full z-10"
                    style={{
                      left: `${50 + userMdsPosition[0] / 2}%`,
                      top: `${50 - userMdsPosition[1] / 2}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="absolute w-12 h-12 bg-primary/30 rounded-full animate-pulse"
                      style={{ top: "-50%", left: "-50%" }}
                    ></div>
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 font-medium text-sm whitespace-nowrap">
                      You
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              This visualization shows the similarity between your complete response profile and other political
              viewpoints. Points that are closer together represent more similar overall political perspectives, beyond
              just the traditional left-right spectrum.
            </p>
          </div>

          <div className="space-y-6 text-left mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Economic Axis: {economicPosition > 20 ? "Right" : economicPosition < -20 ? "Left" : "Centrist"}
              </h2>
              <p className="text-muted-foreground">
                {economicPosition > 50
                  ? "You strongly favor free markets and limited government intervention in the economy."
                  : economicPosition > 20
                    ? "You tend to support market-based solutions while accepting some government regulation."
                    : economicPosition < -50
                      ? "You strongly favor economic equality and significant government intervention in the economy."
                      : economicPosition < -20
                        ? "You tend to support social welfare programs and regulations on business."
                        : "You hold balanced views on economic issues, seeing value in both market mechanisms and government intervention."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Social Axis: {socialPosition > 20 ? "Authoritarian" : socialPosition < -20 ? "Libertarian" : "Centrist"}
              </h2>
              <p className="text-muted-foreground">
                {socialPosition > 50
                  ? "You strongly favor social order, tradition, and authority."
                  : socialPosition > 20
                    ? "You tend to value stability and traditional social structures."
                    : socialPosition < -50
                      ? "You strongly favor individual liberty and personal freedom."
                      : socialPosition < -20
                        ? "You tend to support civil liberties and social progressivism."
                        : "You hold balanced views on social issues, valuing both personal freedom and social cohesion."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Centrist Analysis</h2>
              <p className="text-muted-foreground">
                {Math.abs(economicPosition) < 20 && Math.abs(socialPosition) < 20
                  ? Math.abs(economicPosition) < 10 && Math.abs(socialPosition) < 10
                    ? "Your views reflect a passive centrism, indicating you may avoid taking strong positions on many issues."
                    : "Your views reflect a radical centrism, suggesting you hold strong but balanced views that don't fit neatly into left-right categories."
                  : "Your views show a mix of positions that don't align with traditional political categories."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Multi-Dimensional Analysis</h2>
              <p className="text-muted-foreground">
                Based on your complete response profile, your political views most closely align with
                {(() => {
                  // Find closest respondent in MDS space
                  const distances = sampleRespondents.map((r) => {
                    const dx = r.position[0] - userMdsPosition[0]
                    const dy = r.position[1] - userMdsPosition[1]
                    return { id: r.id, label: r.label, distance: Math.sqrt(dx * dx + dy * dy) }
                  })
                  distances.sort((a, b) => a.distance - b.distance)
                  return ` ${distances[0].label.toLowerCase()} perspectives, with elements of ${distances[1].label.toLowerCase()} thinking.`
                })()}
                This reflects the nuanced nature of your political beliefs beyond simple left-right categorization.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={() => {
                setResponses({})
                setCurrentQuestion(0)
                setSubmitted(false)
              }}
            >
              Retake Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Fixed header with progress */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Questions */}
      <div className="pt-20 pb-24">
        {questions.map((question, index) => (
          <div
            key={index}
            ref={(el) => (questionRefs.current[index] = el)}
            className={`min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 transition-opacity duration-500 ${
              isAnimating && index !== currentQuestion ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-full max-w-3xl mx-auto animate-fade-up">
              <div className="space-y-12 py-8">
                <h2 className="text-2xl font-semibold text-center">{question}</h2>

                <div className="space-y-8 px-4">
                  <CustomSlider value={responses[index] || 50} onChange={(value) => handleResponse(index, value)} />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Strongly Disagree</span>
                    <span className="font-medium">{getResponseLabel(responses[index] || 50)}</span>
                    <span className="text-muted-foreground">Strongly Agree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed footer with navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto p-4">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => scrollToQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button onClick={() => scrollToQuestion(currentQuestion + 1)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={Object.keys(responses).length < questions.length / 2} // Allow submission if at least half the questions are answered
              >
                See Results
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

