import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadGate from "@/components/LeadGate";
import type { LeadInfo } from "@/types/quiz";

const LeadForm = () => {
  const navigate = useNavigate();

  const handleSubmitted = (lead: LeadInfo) => {
    try {
      localStorage.setItem("panelLeadInfo", JSON.stringify(lead));
    } catch {}
    navigate("/loading");
  };

  return (
    <main>
      <SEOHead title="LED Upgrade Savings — Calculate Your Annual Savings" description="Enter your details to get your personalized LED upgrade savings report and discover how much you can save annually." />
      <section className="container px-4 py-10">
        <h1 className="sr-only">LED Upgrade Savings — Calculate Your Annual Savings</h1>
        <div id="lead-gate">
          <LeadGate onSubmitted={handleSubmitted} />
        </div>
      </section>
    </main>
  );
};

export default LeadForm;
