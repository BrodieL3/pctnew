"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { CustomSlider } from "@/components/political-compass/custom-slider";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/contexts/survey-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
];

// Likert scale options mapped to slider values
const getResponseLabel = (value: number) => {
  if (value < 12.5) return "Strongly Disagree";
  if (value < 25) return "Disagree";
  if (value < 37.5) return "Somewhat Disagree";
  if (value < 50) return "Slightly Disagree";
  if (value === 50) return "Neutral";
  if (value < 62.5) return "Slightly Agree";
  if (value < 75) return "Somewhat Agree";
  if (value < 87.5) return "Agree";
  return "Strongly Agree";
};

// Sample data for MDS visualization
/*
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
*/

export function PoliticalCompassTest() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  // const [userMdsPosition, setUserMdsPosition] = useState<[number, number]>([0, 0])
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use the survey context to update the progress
  const { setCurrentQuestion, setTotalQuestions } = useSurvey();

  // Set the total questions when the component mounts
  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [setTotalQuestions]);

  // Update the current question in the context whenever it changes
  useEffect(() => {
    setCurrentQuestion(currentQuestionIndex + 1);
  }, [currentQuestionIndex, setCurrentQuestion]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = questionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1 && index !== currentQuestionIndex) {
              setCurrentQuestionIndex(index);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    const currentRefs = questionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [questionRefs.current.length, currentQuestionIndex]);

  const handleResponse = (questionIndex: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    // Create a complete response set, filling in neutral (50) for any unanswered questions
    const completeResponses = { ...responses };

    // Fill in neutral values for any unanswered questions
    questions.forEach((_, index) => {
      if (completeResponses[index] === undefined) {
        completeResponses[index] = 50; // Neutral value
      }
    });

    console.log("Test responses:", completeResponses);

    // Calculate position based on responses (including neutral defaults)
    const calculatePosition = () => {
      // Calculate economic axis (left-right)
      const economicQuestions = [0, 2, 9, 11, 12, 15, 21, 23, 26];
      const economicScore =
        economicQuestions.reduce(
          (sum, q) => sum + (completeResponses[q] || 50),
          0
        ) / economicQuestions.length;
      const economicPosition = ((economicScore - 50) / 50) * 100; // -100 to 100 scale

      // Calculate social axis (libertarian-authoritarian)
      const socialQuestions = [1, 4, 6, 7, 10, 13, 16, 19, 20, 22, 25, 28];
      const socialScore =
        socialQuestions.reduce(
          (sum, q) => sum + (completeResponses[q] || 50),
          0
        ) / socialQuestions.length;
      const socialPosition = ((socialScore - 50) / 50) * 100; // -100 to 100 scale

      // Store the results in localStorage for the results page to access
      localStorage.setItem(
        "politicalCompassResults",
        JSON.stringify({
          economic: economicPosition,
          social: socialPosition,
          economicScore: economicScore,
          socialScore: socialScore,
          responses: completeResponses,
        })
      );
    };

    calculatePosition();
    router.push("/surveys/political-compass/results");
  };

  const scrollToQuestion = (index: number) => {
    setIsAnimating(true);
    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const answeredQuestionsCount = Object.keys(responses).length;
  const neutralQuestionsCount = questions.length - answeredQuestionsCount;

  return (
    <div className="relative">
      {/* Questions */}
      <div className="pt-20 pb-24">
        {questions.map((question, index) => (
          <div
            key={index}
            ref={(el) => {
              questionRefs.current[index] = el;
            }}
            className={`min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 transition-opacity duration-500 ${
              isAnimating && index !== currentQuestionIndex
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            <div className="w-full max-w-3xl mx-auto animate-fade-up">
              <div className="space-y-12 py-8">
                <h2 className="text-2xl font-semibold text-center">
                  {question}
                </h2>

                <div className="space-y-8 px-4">
                  <CustomSlider
                    value={responses[index] || 50}
                    onChange={(value) => handleResponse(index, value)}
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Strongly Disagree
                    </span>
                    <span className="font-medium">
                      {getResponseLabel(responses[index] || 50)}
                    </span>
                    <span className="text-muted-foreground">
                      Strongly Agree
                    </span>
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
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex justify-between sm:justify-start gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  scrollToQuestion(Math.max(0, currentQuestionIndex - 1))
                }
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              {currentQuestionIndex < questions.length - 1 && (
                <Button
                  onClick={() => scrollToQuestion(currentQuestionIndex + 1)}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {currentQuestionIndex === questions.length - 1 && (
              <div className="flex items-center gap-2">
                <Button onClick={handleSubmit}>See Results</Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        You answered {answeredQuestionsCount} of{" "}
                        {questions.length} questions.
                        {neutralQuestionsCount > 0 &&
                          ` The remaining ${neutralQuestionsCount} questions will be treated as "Neutral" responses.`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
