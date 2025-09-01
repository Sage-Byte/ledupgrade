import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreLEDQuiz } from "@/lib/ledQuizScoring";
import type { LEDQuizAnswers } from "@/types/ledQuiz";
import { useMemo } from "react";

interface LEDResultsReportProps {
  answers: LEDQuizAnswers;
  onDownload: () => void;
  onBookScroll: () => void;
}

const LEDResultsReport = ({ answers, onDownload, onBookScroll }: LEDResultsReportProps) => {
  const { score } = useMemo(() => scoreLEDQuiz(answers), [answers]);

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

  const savings = useMemo(() => estimateSavings(answers, score), [answers, score]);
  const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const areas = new Set(answers.upgradeAreas || []);
  const isWholeHouse = areas.has("Whole house");
  const isCommercial = areas.has("Commercial space");

  return (
    <section className="container px-4 py-8" aria-labelledby="analysis-heading">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle id="analysis-heading">Your LED Upgrade Savings Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>💡 Congratulations! Your LED Upgrade Report is ready.</p>
            <p>💰 You could save <strong>{currency.format(savings)} per year</strong> by upgrading to professional LED lighting with Electric Medic.</p>
            <p>⚡ Here's your personalized breakdown: Based on your current lighting setup and usage patterns, LED upgrades can reduce your lighting energy consumption by 60-80%. Your savings potential score is <strong>{Math.round((score/20)*100)}%</strong>.</p>
            <p>🏡 Our recommendation: {isWholeHouse ? "A comprehensive whole-house LED conversion" : isCommercial ? "Commercial-grade LED lighting solutions" : "Strategic LED upgrades for your selected areas"} with professional installation and premium fixtures.</p>
            <p>🌟 LED benefits: Beyond savings, you'll get better light quality, longer lifespan (15-25 years), reduced heat output, and enhanced property value.</p>
            <p>🚀 Ready to upgrade? Get your free lighting assessment from Electric Medic. Most LED installations complete within 1-3 days with minimal disruption.</p>
            <p className="text-xs text-muted-foreground">Estimates based on average Columbus area utility rates and typical usage patterns. Professional assessment recommended for final quote.</p>
          </CardContent>
        </Card>

        <Card className="bg-success/10 border-success/30">
          <CardHeader>
            <CardTitle className="text-success">What Happens Next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">1</span><p>You'll receive a detailed LED savings report with fixture recommendations via text.</p></div>
            <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">2</span><p>Schedule your free in-home lighting assessment with our licensed electricians.</p></div>
            <div className="flex items-start gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">3</span><p>Get your custom quote and start saving with professional LED installation.</p></div>
          </CardContent>
        </Card>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-cta="book-call" variant="hero" onClick={onBookScroll}>Schedule Free Assessment</Button>
            <Button variant="outline" onClick={onDownload}>Download Report (HTML)</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LEDResultsReport;