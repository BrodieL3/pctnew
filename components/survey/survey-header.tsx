"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSurvey } from "@/contexts/survey-context"

export function SurveyHeader() {
  const pathname = usePathname()
  const { currentQuestion, totalQuestions } = useSurvey()

  const progress = Math.round((currentQuestion / totalQuestions) * 100)

  // Only show the header with progress if we're in a survey
  if (!pathname.includes("/surveys/survey/") && !pathname.includes("/surveys/political-compass")) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <div className="text-sm font-medium">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}

