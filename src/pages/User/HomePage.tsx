import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight, MapPin, Star, Heart, Sparkles, ShieldCheck, Zap } from "lucide-react";
import HeroSection from "@/components/modules/Home/HeroSection";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useGetToursQuery,
} from "@/redux/features/tour/tour.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const { data: tourData } = useGetToursQuery({ limit: 12, page: 1 });
  const { data: divisionData, isLoading: divisionsLoading } = useGetDivisionsQuery({ limit: 10, page: 1 });

  const tours = useMemo(() => tourData?.data || [], [tourData?.data]);
  const divisions = useMemo(() => divisionData?.data || [], [divisionData?.data]);

  const featuredTours = useMemo(() => {
    if (!tours || tours.length === 0) return [];
    return [...tours].sort((a, b) => (a.costFrom || 0) - (b.costFrom || 0)).slice(0, 3);
  }, [tours]);

  const formatDays = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "--";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return `${days} ${days > 1 ? "Days" : "Day"}`;
  };

  return (
    <main className="space-y-24 pb-20">
      <HeroSection />

      {/* 1. Explore Top Destinations (Grid with centered text) */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-200 text-blue-600">Destinations</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explore Top Destinations</h2>
          <p className="text-muted-foreground mt-2">Handpicked regions for your next great escape</p>
        </div>

        {divisionsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-40 rounded-2xl bg-slate-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.slice(0, 4).map((division: any) => (
              <Link key={division._id} to={`/tours?division=${division._id}`} className="group">
                <div className="relative overflow-hidden rounded-2xl border bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold">{division.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Explore hidden gems in this region.</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Tours <ArrowRight className="ml-1 size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 2. Featured Tours (Modern Card UI) */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 border-indigo-200 text-indigo-600">Handpicked</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Adventures</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
            <Link to="/tours" className="flex items-center gap-2">View All Tours <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <Card key={tour._id} className="group overflow-hidden rounded-3xl border-none shadow-md transition-all hover:shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={tour.images?.[0] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e"} 
                  alt={tour.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                   <Badge className="bg-white/90 backdrop-blur-md text-black hover:bg-white">{tour.division?.name}</Badge>
                </div>
                <button className="absolute top-4 right-4 rounded-full bg-white/20 p-2 backdrop-blur-md text-white transition hover:bg-red-500 hover:text-white">
                  <Heart className="size-4 fill-current" />
                </button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                  <Star className="size-3 fill-current" /> 4.9 (120 Reviews)
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors leading-tight">
                  {tour.title}
                </CardTitle>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">From</p>
                    <p className="text-xl font-bold text-blue-600">${tour.costFrom}</p>
                  </div>
                  <div className="text-right text-sm font-medium">
                    <span className="block">{formatDays(tour.startDate, tour.endDate)}</span>
                    <span className="text-muted-foreground font-normal">{tour.maxGuest} Guests</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full rounded-xl bg-slate-950 py-6 transition-all hover:bg-blue-600">
                  <Link to={`/tours/${tour.slug}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. How It Works (Minimalist Icons) */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Start your journey in 3 steps</h2>
            <p className="text-muted-foreground">We've simplified the travel booking process so you can focus on the experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Sparkles />, title: "Find your spark", desc: "Browse our collection of hand-picked unique experiences." },
              { icon: <ShieldCheck />, title: "Secure Booking", desc: "Confirm your spot with our encrypted and safe payment system." },
              { icon: <Zap />, title: "Instant Access", desc: "Receive your digital itinerary and get ready to explore." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform group-hover:-translate-y-2 group-hover:text-blue-600 group-hover:shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA (High Impact Minimalist) */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-blue-600 px-8 py-16 text-center text-white md:py-24">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-30">
            <div className="aspect-square w-[400px] rounded-full bg-white" />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Join 2,000+ travelers exploring the world</h2>
            <p className="mt-6 text-blue-100 text-lg">Sign up today and get 10% off your first booking.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white px-8 text-blue-600 hover:bg-blue-50">Get Started Now</Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 px-8 text-white hover:bg-white/20">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;