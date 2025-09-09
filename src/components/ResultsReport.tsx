import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreQuiz } from "@/lib/quizScoring";
import type { QuizAnswers } from "@/types/quiz";
import { useMemo } from "react";

interface ResultsReportProps {
  answers: QuizAnswers;
  onDownload: () => void;
  onBookScroll: () => void;
}

const ResultsReport = ({ answers, onDownload, onBookScroll }: ResultsReportProps) => {
  const { score } = useMemo(() => scoreQuiz(answers), [answers]);

  const estimateSavings = (a: QuizAnswers, s: number) => {
    let base = 250;
    const billMult: Record<NonNullable<QuizAnswers["trips"]>, number> = {
      "Never": 0.9,
      "A few times a year": 1,
      "Monthly": 1.15,
      "Weekly": 1.35,
      "Daily": 1.55,
      "": 1,
    } as const;
    base *= billMult[a.trips || ""] || 1;
    const loads = new Set(a.loads || []);
    base += (loads.has("EV charger") ? 200 : 0)
      + (loads.has("Heat pump / HVAC") ? 150 : 0)
      + (loads.has("Induction range") ? 120 : 0)
      + (loads.has("Hot tub / sauna") ? 100 : 0)
      + (loads.has("Solar / battery soon") ? 200 : 0);
    if (a.homeSize === "2500-4000") base += 100;
    if (a.homeSize === "4000+") base += 180;
    const multiplier = 1 + s / 20;
    const est = Math.round((base * multiplier) / 10) * 10;
    return Math.max(200, Math.min(est, 5000));
  };

  const savings = useMemo(() => estimateSavings(answers, score), [answers, score]);
  const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const loads = new Set(answers.loads || []);

  return (
    <section className="container px-4 py-8" aria-labelledby="analysis-heading">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle id="analysis-heading">Your Personalized Savings Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>🎉 Congratulations! Your Smart Panel Savings Report is ready.</p>
            <p>💰 You could save <strong>{currency.format(savings)} per year</strong> with a smart panel and intelligent load management tailored to your home.</p>
            <p>⚡ Here's your personalized breakdown: With your appliance profile and schedule, a smart panel can automatically shift heavy loads to off‑peak times and cut waste. Based on your inputs, your potential savings score is <strong>{Math.round((score/12)*100)}%</strong>.</p>
            <p>🏡 Our recommendation: a premium smart panel setup sized for your home{loads.has("Solar / battery soon") ? ", plus battery‑ready wiring" : ""}. This configuration is designed to maximize control, safety, and savings.</p>
            <p>🔋 Battery boost: {loads.has("Solar / battery soon") ? "Great call — pairing with solar/battery further increases savings." : "Consider adding solar or a small battery later — it can further increase savings."}</p>
            <p>🚀 Ready to lower bills? Get your free professional survey and start saving immediately. Typical installations complete within 2–6 weeks.</p>
            <p className="text-xs text-muted-foreground">Estimates are based on typical utility rates and usage patterns. A professional survey is recommended for a final quote.</p>
          </CardContent>
        </Card>


        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-cta="book-call" variant="hero" onClick={onBookScroll}>Schedule Consultation</Button>
            <Button variant="outline" onClick={onDownload}>Download Report (HTML)</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsReport;
