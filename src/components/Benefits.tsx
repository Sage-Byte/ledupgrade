import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ledLivingRoom from "@/assets/led-living-room.jpg";
import ledKitchen from "@/assets/led-kitchen.jpg";
import ledOutdoor from "@/assets/led-outdoor.jpg";

const benefits = [
  {
    title: "Massive Energy Savings",
    desc: "LED lighting uses 75% less energy and lasts 25x longer than traditional bulbs.",
    icon: Zap,
  },
  {
    title: "Professional Installation",
    desc: "Licensed electricians ensure perfect placement, dimming compatibility, and safety compliance.",
    icon: Shield,
  },
  {
    title: "Instant Home Value",
    desc: "Modern LED lighting boosts curb appeal and property value with immediate visual impact.",
    icon: CheckCircle,
  },
];

const ledImages = [
  { src: ledLivingRoom, alt: "Modern LED living room lighting upgrade" },
  { src: ledKitchen, alt: "Professional LED kitchen lighting installation" },
  { src: ledOutdoor, alt: "Energy-efficient LED landscape and outdoor lighting" },
];

const Benefits = () => {
  return (
    <section className="container px-4 py-12" aria-labelledby="benefits-heading">
      <div className="text-center mb-8">
    <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold">Why upgrade to LED now?</h2>
  </div>
  <div className="mb-8">
    <Carousel className="w-full">
      <CarouselContent>
        {ledImages.map((img, idx) => (
          <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-2">
              <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl border bg-muted">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious aria-label="Previous LED photo" />
      <CarouselNext aria-label="Next LED photo" />
    </Carousel>
  </div>
  <div className="grid md:grid-cols-3 gap-4">
        {benefits.map(({ title, desc, icon: Icon }) => (
          <Card key={title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 text-accent-foreground">
                  <Icon className="w-5 h-5" />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block text-xs rounded-full bg-accent/15 text-accent-foreground px-3 py-1">
          Complete the quiz today and claim $200 OFF your LED upgrade project.
        </span>
      </div>
    </section>
  );
};

export default Benefits;