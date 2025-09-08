import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import evImg from "@/assets/interior-ev-garage.jpg";
import kitchenImg from "@/assets/kitchen-induction.jpg";
import officeImg from "@/assets/home-office.jpg";

const testimonials = [
  {
    quote:
      "Our LED upgrade saved us $480 per year. The brightness is incredible and our electric bill dropped by 40%.",
    author: "A. Morgan, Scottsdale",
  },
  {
    quote:
      "Installation was seamless, and we're already seeing the savings after just two months.",
    author: "J. Patel, Austin",
  },
  {
    quote:
      "Best investment we made—beautiful lighting and huge energy savings every month.",
    author: "K. Lee, San Jose",
  },
];

const cases = [
  {
    title: "150A → 200A Upgrade",
    scope: "New main disconnect, grounding, tidy rewiring",
    outcome: "Reduced trips 90%",
    img: evImg,
  },
  {
    title: "Load Balancing + New Circuits",
    scope: "Dedicated induction range + office",
    outcome: "Stable power for peak loads",
    img: kitchenImg,
  },
  {
    title: "EV-Ready Panel",
    scope: "200A main, subpanel for garage",
    outcome: "Two EV chargers with headroom",
    img: officeImg,
  },
];

const SocialProof = () => {
  return (
    <section className="container px-4 py-12" aria-labelledby="proof-heading">
      <div className="text-center mb-8">
        <h2 id="proof-heading" className="text-2xl sm:text-3xl font-bold">LED Upgrade Savings — Calculate Your Annual Savings</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <Card key={t.author}>
            <CardContent className="pt-6">
              <blockquote className="text-sm sm:text-base">“{t.quote}”</blockquote>
              <p className="mt-3 text-xs text-muted-foreground">— {t.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">Licensed • Insured • Permit & inspection included • Manufacturer warranty</p>
      </div>
    </section>
  );
};

export default SocialProof;
