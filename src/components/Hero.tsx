import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";

const VALUE_CHIPS = [
  "Cut energy bills by 80%",
  "Professional LED installation",
  "Licensed & certified electricians",
  "Lifetime warranty included",
];

export type AgeOption = "<10" | "10-20" | "20-30" | "30+ / not sure" | "";

interface HeroProps {
  age: AgeOption;
  setAge: (age: AgeOption) => void;
  onStartQuiz: () => void;
  onContinue: () => void;
  step: number;
  totalSteps: number;
}

const Hero = ({ age, setAge, onStartQuiz, onContinue, step, totalSteps }: HeroProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [homeowner, setHomeowner] = useState<"yes" | "no" | "">("");
  
  const handleHomeownerSelect = (value: "yes" | "no") => {
    setHomeowner(value);
    // Store in localStorage for later use
    localStorage.setItem("homeowner", value);
  };

  useEffect(() => {
    // Ensure focus ring is visible for accessibility when jumping to Q1
    if (sectionRef.current) {
      sectionRef.current.setAttribute("tabindex", "-1");
    }
  }, []);

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <header className="relative overflow-hidden bg-white">
      <div className="bg-white">
        <div className="container px-4 py-12 sm:py-16 md:py-20 text-foreground">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium" style={{backgroundColor: '#e2f6ec', color: '#000000'}}>
                <span aria-hidden>✨</span> LED Savings Calculator
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
              LED Upgrade Savings — Calculate Your Annual Savings
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-center opacity-90">
              Take our <strong>FREE 60‑second LED quiz</strong> to calculate how much professional LED upgrades could save you each year — customized for your home.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex gap-1 text-lg" aria-label="4.9 out of 5 stars">
                <span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span>
              </div>
              <span className="text-sm">4.9/5 from 1,500+ homeowners</span>
            </div>
            <div
              ref={sectionRef}
              className="mx-auto max-w-2xl rounded-2xl bg-card text-foreground shadow-lg border border-white/10 overflow-hidden focus:outline-none"
            >
              <div className="bg-success/15 text-success px-4 py-2 text-sm flex items-center justify-between">
                <span>Columbus homeowners save $800+ annually with professional LED upgrades</span>
                <span aria-hidden>→</span>
              </div>
              <div className="p-5 sm:p-7">
                <fieldset>
                  <legend className="text-2xl sm:text-3xl font-semibold text-center mb-2">💡 Are you a homeowner?</legend>
                  <p className="text-center text-muted-foreground mb-4">LED upgrades provide maximum value for property owners</p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleHomeownerSelect('yes')}
                      aria-pressed={homeowner==='yes'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${homeowner==='yes' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{homeowner==='yes' ? '✅' : ''}</span>
                      <span className="font-medium">Yes, I own my home</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHomeownerSelect('no')}
                      aria-pressed={homeowner==='no'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${homeowner==='no' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{homeowner==='no' ? '❌' : ''}</span>
                      <span className="font-medium">No, I rent/lease</span>
                    </button>
                  </div>

                  <div className="mt-5">
                    <Button data-cta="continue-from-hero" variant="hero" size="lg" className="w-full" onClick={onContinue}>
                      Continue to Next Question →
                    </Button>
                  </div>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ✅ Personalized recommendations • ✅ Instant results • ✅ 100% Free
                  </p>
                </fieldset>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {VALUE_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs sm:text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
