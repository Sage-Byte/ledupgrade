import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadGate from "@/components/LeadGate";
import type { LeadInfo } from "@/types/ledQuiz";

const LEDLeadForm = () => {
  const navigate = useNavigate();

  const handleSubmitted = (lead: LeadInfo) => {
    try {
      localStorage.setItem("ledLeadInfo", JSON.stringify(lead));
    } catch {}
    navigate("/led-results");
  };

  return (
    <main>
      <SEOHead title="Get Your LED Savings Report | Electric Medic" description="Enter your details to get your personalized LED upgrade savings report and claim your discount." />
      <section className="container px-4 py-10">
        <h1 className="sr-only">Get Your LED Savings Report</h1>
        <div id="lead-gate">
          <LeadGate onSubmitted={handleSubmitted} />
        </div>
      </section>
    </main>
  );
};

export default LEDLeadForm;