"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SurveyContextType {
  currentQuestion: number
  totalQuestions: number
  setCurrentQuestion: (question: number) => void
  setTotalQuestions: (total: number) => void
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined)

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(30)

  return (
    <SurveyContext.Provider
      value={{
        currentQuestion,
        totalQuestions,
        setCurrentQuestion,
        setTotalQuestions,
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export function useSurvey() {
  const context = useContext(SurveyContext)
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider")
  }
  return context
}

