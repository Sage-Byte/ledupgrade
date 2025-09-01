import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LEDResultsReport from "@/components/LEDResultsReport";
import CalendarSection from "@/components/CalendarSection";
import type { LEDQuizAnswers, LeadInfo } from "@/types/ledQuiz";

const LEDResults = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<LEDQuizAnswers | null>(null);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  useEffect(() => {
    try {
      const a = localStorage.getItem("ledQuizAnswers");
      const l = localStorage.getItem("ledLeadInfo");
      if (a) setAnswers(JSON.parse(a));
      if (l) setLead(JSON.parse(l));
    } catch {}
  }, []);

  useEffect(() => {
    if (answers == null) {
      // If no quiz context, send back to quiz
      const t = setTimeout(() => navigate("/led-quiz"), 600);
      return () => clearTimeout(t);
    }
  }, [answers, navigate]);

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

  return (
    <main>
      <SEOHead
        title="Your LED Upgrade Savings Report | Electric Medic"
        description="Estimated annual savings and personalized recommendations for your LED lighting upgrade."
      />

      <section className="container px-4 py-8">
        <h1 className="sr-only">Your LED Upgrade Savings Report</h1>
        {answers && (
          <LEDResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
        )}
      </section>

      {lead && (
        <div id="calendar">
          <CalendarSection leadName={lead.name} />
        </div>
      )}
    </main>
  );
};

export default LEDResults;