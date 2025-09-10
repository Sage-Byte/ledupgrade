import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";
import ThreeSteps from "@/components/ThreeSteps";
import BottomCTA from "@/components/BottomCTA";
import SiteFooter from "@/components/SiteFooter";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SiteHeader from "@/components/SiteHeader";
import AssessmentCompare from "@/components/AssessmentCompare";
import type { QuizAnswers } from "@/types/quiz";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: "",
    trips: "",
    loads: [],
    homeSize: "",
    sqFtDetail: "",
    zip: "",
    timeline: "",
  });

  const totalSteps = 6;

  const onStartQuiz = () => {
    navigate("/led-quiz");
  };

  const onContinueFromHero = () => {
    // Store homeowner value if available
    const homeownerValue = localStorage.getItem("homeowner");
    if (homeownerValue) {
      navigate(`/led-quiz?homeowner=${homeownerValue}`);
    } else {
      navigate("/led-quiz");
    }
  };





  const seoTitle = "LED Upgrade Savings | Cut Energy Bills 80% | Electric Medic Columbus";
  const seoDesc = "Calculate your annual LED lighting savings with our free quiz. Professional LED installation in Columbus, Ohio. Save $800+ per year with certified electricians.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />
      <SiteHeader />
      <Hero
        age={answers.age as any}
        setAge={(age) => setAnswers({ ...answers, age })}
        onStartQuiz={onStartQuiz}
        onContinue={onContinueFromHero}
        step={step}
        totalSteps={totalSteps}
      />
      <AssessmentCompare />
      
      <Benefits />
      <SocialProof />
      <ThreeSteps onCTAClick={() => navigate("/led-quiz")} />
      





      <BottomCTA onCTAClick={() => navigate("/led-quiz")} />
      <SiteFooter />

      <MobileStickyCTA onClick={onContinueFromHero} />
    </main>
  );
};

export default Index;
