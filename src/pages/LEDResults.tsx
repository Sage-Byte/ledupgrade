import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LEDResultsReport from "@/components/LEDResultsReport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

    // Track Lead event for Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  useEffect(() => {
    // Load the GHL booking script
    const script = document.createElement("script");
    script.src = "https://link.wattleads.com/js/form_embed.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
    
    return () => {
      // Remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
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
        <>
          <section className="container px-4 py-8 pb-8">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-success/10 border-success/30">
                <CardHeader>
                  <CardTitle className="text-success">What Happens Next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">1</span><p>You'll receive a detailed savings report via text with exact calculations.</p></div>
                  <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">2</span><p>Reply to confirm your free consultation to discuss your personalized plan.</p></div>
                  <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">3</span><p>Get your custom quote and start saving on your electricity bills.</p></div>
                </CardContent>
              </Card>
              
              <div className="text-center mt-8">
                <Button data-cta="book-call" variant="hero" onClick={bookScroll} className="w-[250px]">Schedule Consultation</Button>
                <Button variant="outline" onClick={downloadReport} className="mt-3 sm:mt-0 sm:ml-3">Download Report (HTML)</Button>
              </div>
            </div>
          </section>
          
          <section id="calendar" className="container px-4 py-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <iframe 
                src="https://link.wattleads.com/widget/booking/k7RqGxumfpwdIfSp4hYO" 
                style={{width: "100%", height: "700px", border:"none", overflow: "hidden"}} 
                scrolling="no" 
                id="k7RqGxumfpwdIfSp4hYO_1757369186421"
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default LEDResults;