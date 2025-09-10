import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useEffect, useState, useMemo } from "react";
import type { LeadInfo, LEDQuizAnswers } from "@/types/ledQuiz";

const LEDLeadForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get quiz answers from localStorage
  const quizAnswers = useMemo(() => {
    try {
      const savedAnswers = localStorage.getItem("ledQuizAnswers");
      if (savedAnswers) {
        return JSON.parse(savedAnswers) as LEDQuizAnswers;
      }
    } catch {}
    return null;
  }, []);

  // Get URL parameters from current page and build form URL
  const formUrl = useMemo(() => {
    const baseUrl = "https://link.wattleads.com/widget/form/vQrw5rbf6KGVbYIpgqV9";
    const currentParams = window.location.search;
    return currentParams ? `${baseUrl}${currentParams}` : baseUrl;
  }, []);

  // Handle form submission events from the GHL form
  useEffect(() => {
    // Pre-connect to form domain to speed up loading
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://link.wattleads.com";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);

    // Add DNS prefetch as well
    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = "https://link.wattleads.com";
    document.head.appendChild(dnsPrefetch);

    // Load the GHL form embed script with priority - but only if not already loaded
    let script = document.querySelector('script[src="https://link.wattleads.com/js/form_embed.js"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://link.wattleads.com/js/form_embed.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const handleGHLFormSubmit = (event: MessageEvent) => {
      // Check if the message is from the GHL form
      if (event.data && event.data.type === "ghl:formSubmitted") {
        try {
          // Create lead object from form data
          const lead: LeadInfo = {
            name: event.data.formData?.name || "",
            email: event.data.formData?.email || "",
            phone: event.data.formData?.phone || "",
            zip: event.data.formData?.zip || quizAnswers?.zip || "",
            consent: true, // Assumed consent as they submitted the form
          };
          localStorage.setItem("ledLeadInfo", JSON.stringify(lead));
          
          // Also pass quiz answers to ensure they're available on the next page
          if (quizAnswers) {
            localStorage.setItem("ledQuizAnswers", JSON.stringify(quizAnswers));
          }
        } catch {}
        navigate("/led-results");
      }
    };

    // Set up iframe load handler with timeout fallback
    let iframeLoadTimeout: NodeJS.Timeout;
    const handleIframeLoad = () => {
      clearTimeout(iframeLoadTimeout);
      setIsLoading(false);
      
      // Apply URL parameter passing fix for GHL after iframe loads
      setTimeout(() => {
        const iframe = document.querySelector('iframe[src*="wattleads.com"], iframe[src*="form.gohighlevel.com"], iframe[src*="app.gohighlevel.com"]') as HTMLIFrameElement;
        if (!iframe) {
          console.log('No iframe found');
          return;
        }
        const parentQS = window.location.search;
        if (!parentQS) {
          console.log('No parent query string');
          return;
        }
        
        console.log('Parent query string:', parentQS);
        console.log('Current iframe src:', iframe.src);
        
        // Check if parameters are already in the iframe src
        const currentSrc = iframe.src;
        const paramsToAdd = parentQS.substring(1); // Remove the '?' from the beginning
        
        // Check if any of our parameters are already in the iframe src
        const hasParams = paramsToAdd.split('&').some(param => {
          const [key] = param.split('=');
          return currentSrc.includes(key + '=');
        });
        
        if (hasParams) {
          console.log('Parameters already exist in iframe');
          return; // Already has our params
        }
        
        // Add parameters to iframe src
        const separator = currentSrc.includes('?') ? '&' : '?';
        const newSrc = currentSrc + separator + paramsToAdd;
        console.log('Setting iframe src to:', newSrc);
        iframe.src = newSrc;
      }, 500); // Small delay to ensure iframe is ready
    };

    // Fallback to hide loading after 5 seconds even if iframe doesn't fire load event
    iframeLoadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const iframe = document.getElementById("form-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
      // Also try to detect when iframe content is ready
      iframe.addEventListener("error", () => {
        clearTimeout(iframeLoadTimeout);
        setIsLoading(false);
      });
    }

    window.addEventListener("message", handleGHLFormSubmit);
    
    // Clean up function
    return () => {
      clearTimeout(iframeLoadTimeout);
      window.removeEventListener("message", handleGHLFormSubmit);
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
      // Don't remove script and preconnect links as they might be reused
    };
  }, [navigate, quizAnswers]);


  return (
    <main>
      <SEOHead title="Get Your LED Savings Report | Electric Medic" description="Enter your details to get your personalized LED upgrade savings report and claim your discount." />
      <section className="container px-4 py-10">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-3xl font-bold">Get your LED Savings Report</h1>
          <p className="mt-2 text-muted-foreground">Just a few details so we can create your personalized LED Savings Report</p>
          {quizAnswers && (
            <p className="mt-2 text-sm text-green-600">
              Your quiz answers have been saved and will be included in your report.
            </p>
          )}
        </div>

        <div id="lead-gate" className="max-w-3xl mx-auto relative bg-white rounded-lg shadow-sm border" style={{ height: "550px", minHeight: "550px" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm text-gray-600">Loading form...</p>
              </div>
            </div>
          )}
          <iframe
            id="form-iframe"
            src={formUrl}
            style={{
              width:"100%",
              height:"100%",
              border:"none",
              borderRadius:"8px",
              display: "block",
              visibility: isLoading ? "hidden" : "visible",
              background: "white"
            }}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="LED Electric Medic Form"
            data-height="512"
            data-layout-iframe-id="inline-vQrw5rbf6KGVbYIpgqV9"
            data-form-id="vQrw5rbf6KGVbYIpgqV9"
            title="LED Electric Medic Form"
            loading="eager"
            allow="clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
          >
          </iframe>
        </div>
      </section>
    </main>
  );
};

export default LEDLeadForm;