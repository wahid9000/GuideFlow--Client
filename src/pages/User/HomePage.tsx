import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight, Globe, MapPin, Star, Users, Heart } from "lucide-react";
import HeroSection from "@/components/modules/Home/HeroSection";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useGetTourTypesQuery,
  useGetToursQuery,
} from "@/redux/features/tour/tour.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const {
    data: tourData,
    isLoading: toursLoading,
    isError: toursError,
  } = useGetToursQuery({ limit: 12, page: 1 });
  const {
    data: divisionData,
    isLoading: divisionsLoading,
    isError: divisionsError,
  } = useGetDivisionsQuery({ limit: 10, page: 1 });
  const {
    data: tourTypeData,
    isLoading: typesLoading,
    isError: typesError,
  } = useGetTourTypesQuery({ limit: 8, page: 1 });

  const tours = useMemo(() => tourData?.data || [], [tourData?.data]);
  const divisions = useMemo(
    () => divisionData?.data || [],
    [divisionData?.data],
  );
  const tourTypes = useMemo(
    () => tourTypeData?.data || [],
    [tourTypeData?.data],
  );

  const featuredTours = useMemo(() => {
    if (!tours || tours.length === 0) return [];
    return [...tours]
      .sort((a, b) => (a.costFrom || 0) - (b.costFrom || 0))
      .slice(0, 3);
  }, [tours]);

  const formatDays = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "--";
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
      return "--";
    const days = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
    return `${days} ${days > 1 ? "Days" : "Day"}`;
  };

  return (
    <main className="space-y-20">
      <HeroSection />

      <section className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold">Explore Top Destinations</h2>
          <Link to="/tours">
            <Button size="sm" variant="outline" className="gap-2">
              View All Tours
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {divisionsLoading ? (
          <p className="text-muted-foreground">Loading destinations...</p>
        ) : divisionsError ? (
          <p className="text-destructive">
            Unable to load divisions right now.
          </p>
        ) : divisions.length === 0 ? (
          <p className="text-muted-foreground">No destinations available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.slice(0, 3).map((division: any) => (
              <Card
                key={division._id}
                className="rounded-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <CardHeader className="px-4">
                  <div className="flex items-center gap-2 text-blue-950">
                    <Globe className="h-5 w-5" />
                    <CardTitle>{division.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    Discover curated tours and experiences in this region.
                  </p>
                </CardContent>
                <CardFooter className="px-4">
                  <Link
                    to={`/tours?division=${division._id}`}
                    className="w-full"
                  >
                    <Button variant="ghost" className="w-full text-blue-950">
                      Explore {division.name}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4">
        <div className="mb-8 w-full flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold">Featured Tours</h2>
          <p className="text-sm text-muted-foreground">
            Selected from live backend tour data.
          </p>
        </div>

        {toursLoading ? (
          <p className="text-muted-foreground">Loading tours...</p>
        ) : toursError ? (
          <p className="text-destructive">Unable to load tours right now.</p>
        ) : featuredTours.length === 0 ? (
          <p className="text-muted-foreground">No featured tours available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <Card
                key={tour._id}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/tours/${tour.slug}`}>
                  <div className="h-48 w-full overflow-hidden bg-slate-100">
                    {tour.images?.[0] ? (
                      <img
                        src={tour.images[0]}
                        alt={tour.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="pt-4">
                  <Badge variant="secondary" className="mb-3">
                    {tour.division?.name || "General"}
                  </Badge>
                  <CardTitle className="text-lg font-bold">
                    {tour.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                    {tour.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-blue-950 text-white text-xs px-2 py-1 rounded-full">
                      {formatDays(tour.startDate, tour.endDate)}
                    </span>
                    <span className="bg-green-950 text-white text-xs px-2 py-1 rounded-full">
                      ${tour.costFrom}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {tour.maxGuest} guests
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/tours/${tour.slug}`} className="w-full">
                    <Button className="w-full bg-blue-950 text-white hover:bg-blue-900">
                      Book now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold">Popular Categories</h2>
          <Link
            to="/tours"
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            View all categories
          </Link>
        </div>

        {typesLoading ? (
          <p className="text-muted-foreground">Loading categories...</p>
        ) : typesError ? (
          <p className="text-destructive">Unable to load categories.</p>
        ) : tourTypes.length === 0 ? (
          <p className="text-muted-foreground">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {tourTypes.slice(0, 3).map((type: any) => (
              <div
                key={type._id}
                className="rounded-2xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold">{type.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Choose a trip</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Pick from a curated list of tours and experiences.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Book instantly</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Easy booking flow with secure payment integrations.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Enjoy memories</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Relax and enjoy, our local guides take care of you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          What our travelers say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Best tour experience ever! Everything was smooth and the guide was superb.",
              name: "Amina K.",
              stars: 5,
            },
            {
              quote:
                "Affordable, safe, and absolutely memorable trips. Highly recommended!",
              name: "Jason M.",
              stars: 5,
            },
            {
              quote:
                "Excellent customer service and seamless planning. I will book again.",
              name: "Priya S.",
              stars: 5,
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl border shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="mb-4 text-xl text-gray-700">“{item.quote}”</div>
              <div className="flex items-center gap-2 mb-2 text-blue-950">
                {Array.from({ length: item.stars }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-sm font-semibold">{item.name}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready for your next adventure?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
            Get started with unbeatable deals and handpicked tours from our
            verified providers.
          </p>
          <Link to="/tours">
            <Button className="bg-white text-blue-950 px-12 py-3 font-bold hover:bg-gray-100">
              Browse Tours
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
