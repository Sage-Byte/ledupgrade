import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upsertContact, createOpportunity, createContactData, createOpportunityData } from "@/utils/ghlApi";
import type { LeadInfo, LEDQuizAnswers } from "@/types/ledQuiz";

const LEDLeadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  // Pre-fill zip from quiz answers
  useEffect(() => {
    if (quizAnswers?.zip) {
      setFormData(prev => ({ ...prev, zip: quizAnswers.zip || "" }));
    }
  }, [quizAnswers]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get homeowner value from localStorage
      const homeownerValue = localStorage.getItem("homeowner");

      // Create contact data for GHL
      const contactData = createContactData(formData, quizAnswers, homeownerValue || undefined);
      
      // Create contact in GHL
      const contactResponse = await upsertContact(contactData);
      const contactId = contactResponse.contact.id;

      // Create opportunity in GHL
      const opportunityData = createOpportunityData(contactId, formData.name);
      await createOpportunity(opportunityData);

      // Create lead object from form data for local storage
      const lead: LeadInfo = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip: formData.zip,
        consent: formData.consent,
      };
      localStorage.setItem("ledLeadInfo", JSON.stringify(lead));
      
      // Also pass quiz answers to ensure they're available on the next page
      if (quizAnswers) {
        localStorage.setItem("ledQuizAnswers", JSON.stringify(quizAnswers));
      }

      // Track lead event
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }

      // Navigate to results
    navigate("/led-results");
    } catch (error) {
      console.error('Form submission error:', error);
      // You might want to show an error message to the user here
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <main>
      <SEOHead title="Get Your LED Savings Report | Electric Medic" description="Enter your details to get your personalized LED upgrade savings report and claim your discount." />
      <section className="container px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              Your Personalized LED Savings Report is Ready! 🎉
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Enter your details to see your custom results and book a free consultation.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      👤
                    </div>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ✉️
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📞
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-sm font-medium">
                    Postcode *
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📍
                    </div>
                    <Input
                      id="zip"
                      type="text"
                      value={formData.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                      placeholder="Enter your postcode"
                      required
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I agree to be contacted about my LED savings estimate and consultation. *
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Your information is secure and will only be used to provide your LED savings estimate and consultation details.</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                  >
                    ← Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.consent}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Show My Results →
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default LEDLeadForm;