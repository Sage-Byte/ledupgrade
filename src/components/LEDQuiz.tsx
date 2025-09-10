import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import livingRoomImg from "@/assets/led-living-room.jpg";
import kitchenImg from "@/assets/led-kitchen.jpg";
import outdoorImg from "@/assets/led-outdoor.jpg";
import type { LEDQuizAnswers, BillRangeOption, UpgradeAreaOption, HomeSizeOption } from "@/types/ledQuiz";

const STORAGE_KEY = "led-quiz-answers-v1";

const upgradeAreaOptions: UpgradeAreaOption[] = [
  "Living room",
  "Kitchen", 
  "Bedrooms",
  "Bathrooms",
  "Outdoor/landscape",
  "Garage/basement",
  "Whole house",
  "Commercial space",
];

// UI helpers for bill range with icons
const billRangeList: { value: BillRangeOption; label: string; icon: string }[] = [
  { value: "Under $150", label: "Under $150", icon: "💵" },
  { value: "$150–$250", label: "$150–$250", icon: "💰" },
  { value: "$250–$400", label: "$250–$400", icon: "📈" },
  { value: "$400–$600", label: "$400–$600", icon: "📊" },
  { value: "$600+", label: "$600+", icon: "💸" },
];

const lightingTypeList: { value: NonNullable<LEDQuizAnswers["currentLighting"]>; label: string; icon: string }[] = [
  { value: "Traditional incandescent", label: "Traditional incandescent", icon: "💡" },
  { value: "CFL bulbs", label: "CFL bulbs", icon: "🔄" },
  { value: "Some LED", label: "Some LED", icon: "⚡" },
  { value: "Mostly LED", label: "Mostly LED", icon: "✨" },
  { value: "All LED", label: "All LED", icon: "🌟" },
];

const upgradeAreaIcons: Record<UpgradeAreaOption, string> = {
  "Living room": "🛋️",
  "Kitchen": "🍳",
  "Bedrooms": "🛏️",
  "Bathrooms": "🚿",
  "Outdoor/landscape": "🌳",
  "Garage/basement": "🏠",
  "Whole house": "🏡",
  "Commercial space": "🏢",
};

const homeSizeOptions: { value: HomeSizeOption; label: string; icon: string }[] = [
  { value: "<1500", label: "Less than 1,500 sq ft", icon: "🏠" },
  { value: "1500-2500", label: "1,500–2,500 sq ft", icon: "🏡" },
  { value: "2500-4000", label: "2,500–4,000 sq ft", icon: "🏘️" },
  { value: "4000+", label: "4,000+ sq ft", icon: "🏛️" },
];

const timelineOptions: { value: NonNullable<LEDQuizAnswers["timeline"]>; label: string; icon: string }[] = [
  { value: "ASAP", label: "ASAP", icon: "⚡" },
  { value: "1-2 months", label: "1-2 months", icon: "📅" },
  { value: "Exploring options", label: "Exploring options", icon: "💡" },
];

interface LEDQuizProps {
  answers: LEDQuizAnswers;
  setAnswers: (a: LEDQuizAnswers) => void;
  setStepGlobal: (n: number) => void;
  onQuizComplete: () => void;
}

const LEDQuiz = ({ answers, setAnswers, setStepGlobal, onQuizComplete }: LEDQuizProps) => {
  const [step, setStep] = useState<number>(2); // Q2->Q6

  useEffect(() => {
    setStepGlobal(step);
  }, [step, setStepGlobal]);

  useEffect(() => {
    // hydrate from localStorage on mount
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setAnswers({ ...answers, ...data });
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const next = () => {
    if (step < 6) setStep(step + 1);
    else onQuizComplete();
  };
  const prev = () => setStep(Math.max(2, step - 1));

  return (
    <section id="quiz" className="container px-4 pt-24 pb-12" aria-labelledby="quiz-heading">
      <div className="max-w-3xl mx-auto min-h-[calc(100vh-160px)] flex flex-col">
        <h2 id="quiz-heading" className="sr-only">LED Upgrade Savings Quiz</h2>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm" aria-live="polite">Step {step} of {totalSteps}</span>
          <span className="text-sm" aria-hidden>{progress}% Complete</span>
        </div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-primary" style={{ width: `${progress}%` }} />
        </div>

        {step === 2 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What's your average monthly electric bill?</CardTitle>
              <CardDescription>LED upgrades can significantly reduce your lighting costs. Select your typical monthly bill range.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={livingRoomImg} alt="LED lighting in modern living room" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {billRangeList.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, billRange: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.billRange === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.billRange === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What type of lighting do you currently have?</CardTitle>
              <CardDescription>Understanding your current setup helps us calculate your potential LED savings.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={kitchenImg} alt="Modern LED kitchen lighting" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {lightingTypeList.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, currentLighting: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.currentLighting === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.currentLighting === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Which areas would you like to upgrade to LED?</CardTitle>
              <CardDescription>Select all areas where you'd like professional LED installation. Multiple selections help maximize your savings.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={outdoorImg} alt="LED outdoor and landscape lighting" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {upgradeAreaOptions.map((opt) => {
                  const active = answers.upgradeAreas.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const set = new Set(answers.upgradeAreas);
                        if (active) set.delete(opt); else set.add(opt);
                        setAnswers({ ...answers, upgradeAreas: Array.from(set) });
                      }}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                        active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input bg-background hover:bg-accent/10"
                      }`}
                      aria-pressed={active}
                    >
                      <span className="text-xl" aria-hidden>{upgradeAreaIcons[opt]}</span>
                      <span className="font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">How big is your home?</CardTitle>
              <CardDescription>Home size helps us estimate the scale of your LED upgrade project.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <div className="space-y-3">
                {homeSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, homeSize: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.homeSize === opt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.homeSize === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm mb-1">Optional: Specific square footage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="e.g., 3200"
                  value={answers.sqFtDetail || ""}
                  onChange={(e) => setAnswers({ ...answers, sqFtDetail: e.target.value })}
                />
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 6 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What's your project timeline?</CardTitle>
              <CardDescription>Your timeline helps us schedule your LED upgrade and prioritize your savings.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <div>
                <label className="block text-sm mb-1">Timeline</label>
                <div className="space-y-3">
                  {timelineOptions.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setAnswers({ ...answers, timeline: t.value })}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                        answers.timeline === t.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-input bg-background hover:bg-accent/10"
                      }`}
                      aria-pressed={answers.timeline === t.value}
                    >
                      <span className="text-xl" aria-hidden>{t.icon}</span>
                      <span className="font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button data-cta="finish-quiz" variant="hero" onClick={onQuizComplete}>See my LED savings</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default LEDQuiz;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}