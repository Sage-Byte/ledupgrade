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
    navigate("/led-lead");
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