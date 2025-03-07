import type React from "react";
import { SurveyProvider } from "@/contexts/survey-context";

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SurveyProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </SurveyProvider>
  );
}
