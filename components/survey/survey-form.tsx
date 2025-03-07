"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

// Survey questions
const questions = [
  "The product/service meets my expectations.",
  "The product/service is easy to use.",
  "The product/service provides good value for money.",
  "Customer support is responsive to my needs.",
  "I would recommend this product/service to others.",
  "The company communicates effectively with its customers.",
  "The product/service has improved my daily routine.",
  "The product/service is reliable.",
  "The company values my feedback.",
  "The product/service has all the features I need.",
  "The company's website is user-friendly.",
  "The product/service saves me time.",
  "The company's policies are fair and transparent.",
  "The product/service is of high quality.",
  "I feel valued as a customer.",
  "The product/service has helped me solve problems.",
  "The company's billing practices are clear and fair.",
  "The product/service is better than competing alternatives.",
  "The company demonstrates ethical business practices.",
  "The product/service is worth what I paid for it.",
  "The company responds quickly to issues or concerns.",
  "The product/service is innovative.",
  "The company keeps its promises.",
  "The product/service is continuously improving.",
  "I trust this company with my personal information.",
  "The product/service meets industry standards.",
  "The company's marketing accurately represents its offerings.",
  "I plan to continue using this product/service in the future.",
  "The company demonstrates social responsibility.",
  "Overall, I am satisfied with my experience.",
]

// Likert scale options
const options = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree",
]

export function SurveyForm() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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

  const handleResponse = (questionIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }))

    // Auto-scroll to next question after selection
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        questionRefs.current[questionIndex + 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }, 500)
  }

  const handleSubmit = () => {
    console.log("Survey responses:", responses)
    setSubmitted(true)
    toast({
      title: "Survey Submitted",
      description: "Thank you for completing the survey!",
    })
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
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <Card className="w-full max-w-3xl mx-auto p-8 text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">Thank You!</h1>
          <p className="text-xl text-muted-foreground">Your feedback has been submitted successfully.</p>
          <p className="text-muted-foreground">
            We appreciate your time and insights. Your responses will help us improve our products and services.
          </p>
          <Button
            size="lg"
            className="mt-6"
            onClick={() => {
              setResponses({})
              setCurrentQuestion(0)
              setSubmitted(false)
            }}
          >
            Take Another Survey
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
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
            <Card className="w-full max-w-3xl mx-auto p-8 animate-fade-up">
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-center">{question}</h2>

                <RadioGroup
                  value={responses[index] || ""}
                  onValueChange={(value) => handleResponse(index, value)}
                  className="pt-8"
                >
                  <div className="relative">
                    {/* Spectrum bar */}
                    <div className="absolute top-3 left-0 right-0 h-1 bg-muted rounded-full"></div>

                    {/* Radio buttons */}
                    <div className="flex justify-between relative">
                      {options.map((option, optionIndex) => (
                        <div key={option} className="flex flex-col items-center">
                          <RadioGroupItem
                            value={option}
                            id={`q${index}-${optionIndex}`}
                            className="relative z-10 bg-background"
                          />

                          {/* Only show labels for first and last options */}
                          {(optionIndex === 0 || optionIndex === options.length - 1) && (
                            <span className={`text-sm mt-2 ${optionIndex === 0 ? "text-left" : "text-right"}`}>
                              {option}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </Card>
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
              <Button onClick={() => scrollToQuestion(currentQuestion + 1)} disabled={!responses[currentQuestion]}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={Object.keys(responses).length < questions.length}>
                Submit Survey
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

