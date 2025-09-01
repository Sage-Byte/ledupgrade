import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LEDQuiz from "@/components/LEDQuiz";
import LeadGate from "@/components/LeadGate";
import LEDResultsReport from "@/components/LEDResultsReport";
import CalendarSection from "@/components/CalendarSection";
import type { LEDQuizAnswers, LeadInfo } from "@/types/ledQuiz";

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

  const [showLeadGate, setShowLeadGate] = useState(false);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  const onQuizComplete = () => {
    try {
      localStorage.setItem("ledQuizAnswers", JSON.stringify(answers));
    } catch {}
    navigate("/led-results");
  };

  const onLeadSubmitted = (l: LeadInfo) => {
    setLead(l);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>LED Upgrade Report - Electric Medic</title></head><body><h1>LED Upgrade Savings Report</h1><p>Professional LED upgrade analysis and recommendations from Electric Medic. Save for your records.</p><pre>${JSON.stringify({ answers, lead }, null, 2)}</pre></body></html>`;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "led-upgrade-report.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const bookScroll = () => {
    document.querySelector("#calendar")?.scrollIntoView({ behavior: "smooth" });
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

      {showLeadGate && !lead && (
        <div id="lead-gate">
          <LeadGate onSubmitted={onLeadSubmitted} />
        </div>
      )}

      {lead && (
        <div id="results">
          <LEDResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
        </div>
      )}

      {lead && (
        <div id="calendar">
          <CalendarSection leadName={lead.name} />
        </div>
      )}
    </main>
  );
};

export default LEDQuizPage;