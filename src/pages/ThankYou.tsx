import { useMemo, useEffect } from "react";
import evImg from "@/assets/interior-ev-garage.jpg";
import kitchenImg from "@/assets/kitchen-induction.jpg";
import officeImg from "@/assets/home-office.jpg";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const ThankYou = () => {
  const params = new URLSearchParams(window.location.search);
  const name = useMemo(() => params.get("name") || "", [params]);
  
  useEffect(() => {
    // Track Schedule event for Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'Schedule');
    }
  }, []);

  return (
    <main className="max-w-2xl mx-auto">
      <SEOHead 
        title="Thank You | LED Lighting Solutions | Electric Medic Columbus" 
        description="Your consultation is confirmed! We're excited to help you with your LED lighting upgrade installation."
      />
      <section className="px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-600">Thank you!</h1>
        <p className="mt-2 text-muted-foreground text-lg">Your phone consultation is booked.</p>
      </section>

      <section className="px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">What to expect next</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-medium">1</div>
              <div className="pt-1">
                <p>We'll call you at your scheduled time to review your results and answer questions.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">2</div>
              <div className="pt-1">
                <p>If it's a good fit, we'll schedule an in-home assessment.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-amber-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium">3</div>
              <div className="pt-1">
                <p>Have panel access clear and your main breakers reachable.</p>
              </div>
            </div>

            <div className="mt-6 bg-purple-50 p-4 rounded-lg">
              <p className="flex items-center">
                <span className="mr-2">🎉</span>
                Your consultation is confirmed and we're excited to help you with your LED upgrade installation!
              </p>
            </div>
          </div>
        </div>
        
      </section>
    </main>
  );
};

export default ThankYou;
