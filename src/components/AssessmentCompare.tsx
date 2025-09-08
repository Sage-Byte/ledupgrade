import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function AssessmentCompare() {
  return (
    <section
      aria-labelledby="panel-mistake-heading"
      className="py-12 sm:py-16"
    >
      <div className="container px-4">
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            id="panel-mistake-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            The $2,000 Mistake Most Homeowners Make
          </h2>
          <p className="mt-3 text-muted-foreground">
            Many DIY LED upgrades end up costing more than professional installation. 
            Our LED Quiz shows you the smart way to upgrade your lighting.
          </p>
        </header>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Without Assessment */}
          <Card className="border-destructive/30 bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">
                Without Our Assessment:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-destructive">
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Buy wrong LED types and waste 
                  $500–$2,000
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Miss dimming compatibility and 
                  electrical issues
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Install without proper placement 
                  planning
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> No warranty on labor or 
                  installation quality
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* With Assessment */}
          <Card className="border-accent/30 bg-accent/10">
            <CardHeader>
              <CardTitle className="text-accent-foreground">
                With Our Assessment:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-accent-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Get the right LEDs for each 
                  room and fixture type
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Save $500–$1,500 with 
                  professional installation
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Perfect dimming, color 
                  temperature, and placement
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Lifetime warranty on 
                  installation and labor
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}