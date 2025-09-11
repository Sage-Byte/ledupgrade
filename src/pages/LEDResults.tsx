import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LEDResultsReport from "@/components/LEDResultsReport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreLEDQuiz } from "@/lib/ledQuizScoring";
import type { LEDQuizAnswers, LeadInfo } from "@/types/ledQuiz";

const LEDResults = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<LEDQuizAnswers | null>(null);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  // Calculate savings
  const { score } = useMemo(() => answers ? scoreLEDQuiz(answers) : { score: 0 }, [answers]);
  
  const estimateSavings = (a: LEDQuizAnswers, s: number) => {
    let base = 180; // Base LED savings per year
    
    // Bill multiplier - higher bills = more savings potential
    const billMult: Record<string, number> = {
      "Under $150": 0.8,
      "$150–$250": 1,
      "$250–$400": 1.3,
      "$400–$600": 1.6,
      "$600+": 2.0,
    };
    base *= billMult[a.billRange || ""] || 1;

    // Current lighting multiplier - older tech = more savings
    const lightingMult: Record<string, number> = {
      "All LED": 0.3,
      "Mostly LED": 0.6,
      "Some LED": 1,
      "CFL bulbs": 1.4,
      "Traditional incandescent": 1.8,
    };
    base *= lightingMult[a.currentLighting || ""] || 1;

    // Area-specific savings boosts
    const areas = new Set(a.upgradeAreas || []);
    base += (areas.has("Whole house") ? 400 : 0)
      + (areas.has("Kitchen") ? 120 : 0)
      + (areas.has("Living room") ? 100 : 0)
      + (areas.has("Outdoor/landscape") ? 150 : 0)
      + (areas.has("Commercial space") ? 300 : 0);

    // Home size adjustments
    if (a.homeSize === "2500-4000") base += 80;
    if (a.homeSize === "4000+") base += 150;

    // Score multiplier for overall optimization
    const multiplier = 1 + s / 25;
    const est = Math.round((base * multiplier) / 10) * 10;
    
    return Math.max(120, Math.min(est, 3500));
  };

  const savings = useMemo(() => answers ? estimateSavings(answers, score) : 0, [answers, score]);

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

      {/* Savings Summary Section */}
      {answers && (
        <section className="container px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <h2 className="text-green-600 text-sm font-medium mb-2">Your LED Savings Potential</h2>
                <div className="text-4xl font-bold text-gray-900 mb-3">
                  Estimated Annual Savings: ${savings}
                </div>
                <p className="text-gray-600 text-sm mb-6">Based on your home's characteristics and energy usage</p>
                <Button 
                  onClick={bookScroll} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
                >
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="container px-4 py-8">
        <h1 className="sr-only">Your LED Upgrade Savings Report</h1>
        {answers && (
          <LEDResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
        )}
      </section>

      {lead && (
        <section id="calendar" className="container px-4 py-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Book Your Phone Consultation</h2>
            <p className="text-muted-foreground mb-6">Choose a time that works for you. We'll call to review your results and next steps.</p>
            <iframe 
              src="https://link.wattleads.com/widget/booking/k7RqGxumfpwdIfSp4hYO" 
              style={{width: "100%", height: "700px", border:"none", overflow: "hidden"}} 
              scrolling="no" 
              id="k7RqGxumfpwdIfSp4hYO_1757369186421"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default LEDResults;