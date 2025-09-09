import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LEDQuiz from "@/components/LEDQuiz";
import type { LEDQuizAnswers } from "@/types/ledQuiz";

const LEDQuizPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<LEDQuizAnswers>({
    billRange: "",
    currentLighting: "",
    upgradeAreas: [],
    homeSize: "",
    sqFtDetail: "",
    zip: "",
    timeline: "",
  });

  const onQuizComplete = () => {
    try {
      localStorage.setItem("ledQuizAnswers", JSON.stringify(answers));
    } catch {}
    
    // Create URL parameters from quiz answers
    const params = new URLSearchParams();
    
    // Add each quiz answer as individual parameters (prefixed with quiz_)
    if (answers.billRange) params.append("quiz_billRange", answers.billRange);
    if (answers.currentLighting) params.append("quiz_currentLighting", answers.currentLighting);
    if (answers.upgradeAreas && answers.upgradeAreas.length > 0) {
      params.append("quiz_upgradeAreas", answers.upgradeAreas.join(", "));
    }
    if (answers.homeSize) params.append("quiz_homeSize", answers.homeSize);
    if (answers.sqFtDetail) params.append("quiz_sqFtDetail", answers.sqFtDetail);
    if (answers.zip) params.append("quiz_zip", answers.zip);
    if (answers.timeline) params.append("quiz_timeline", answers.timeline);
    
    // Navigate with URL parameters
    const paramString = params.toString();
    navigate(paramString ? `/led-lead?${paramString}` : "/led-lead");
  };

  const seoTitle = "LED Upgrade Savings Quiz | Electric Medic Columbus";
  const seoDesc = "Take our 60-second LED Savings Quiz to discover how much you can save with professional LED lighting upgrades in Columbus, Ohio.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />

      <section className="container px-4 py-8">
        <h1 className="sr-only">LED Upgrade Savings Quiz</h1>
        <LEDQuiz
          answers={answers}
          setAnswers={setAnswers}
          setStepGlobal={setStep}
          onQuizComplete={onQuizComplete}
        />
      </section>

    </main>
  );
};

export default LEDQuizPage;