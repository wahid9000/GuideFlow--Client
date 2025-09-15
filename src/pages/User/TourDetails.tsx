import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { Link, useParams } from "react-router";
import { Separator } from "@/components/ui/separator";
import type { ITour } from "@/types";
import {
  BookIcon,
  CircleDollarSignIcon,
  PersonStandingIcon,
  CalendarDays,
  Clock,
  MapPin,
  Plane,
  List,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourDetailsSkeleton } from "@/components/skeletons/TourDetailSkeleton";

const TourDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSingleTourQuery(slug);
  const tour = data ?? ({} as ITour);

  if (isLoading) {
    return <TourDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-4 md:py-4">
        <h3>Something Went Wrong!!!</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start w-full">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
            {tour.title}
          </h1>
          <div className="flex items-center text-foreground gap-4 text-sm md:text-base mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 " /> {tour.location}
            </span>
            <span className="flex items-center gap-1">
              <CircleDollarSignIcon className="h-4 w-4" /> From ${tour.costFrom}
            </span>
            <span className="flex items-center gap-1">
              <PersonStandingIcon className="h-4 w-4" /> Max {tour.maxGuest}{" "}
              guests
            </span>
          </div>
        </div>

        <Link to={`/booking/${tour.slug}`}>
          <Button className="text-white bg-blue-950 cursor-pointer hover:bg-blue-700 transition-colors py-3 px-6 rounded-full shadow-lg font-semibold text-base">
            <BookIcon className="mr-2 h-5 w-5" />
            Book Now
          </Button>
        </Link>
      </div>
      {tour?.images?.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {tour.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Tour Image ${i + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105"
              />
            ))}
          </div>
        </section>
      )}
      <Separator className="my-10" />
      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content Column */}
        <div className="md:col-span-2">
          {/* Tour Description */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Description
            </h2>
            <p className="text-foreground leading-relaxed text-justify">
              {tour.description}
            </p>
          </section>

          <Separator className="my-10" />

          {/* Key Details Section */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Key Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl  border border-gray-100">
                <CalendarDays className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Duration
                  </h4>
                  <p className="font-semibold text-foreground">
                    {new Date(tour.startDate).toLocaleDateString()} to{" "}
                    {new Date(tour.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl  border border-gray-100">
                <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Location
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.location ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl  border border-gray-100">
                <Plane className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Arrival & Departure
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.arrivalLocation} {"->"} {tour.departureLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl  border border-gray-100">
                <PersonStandingIcon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Minimum Age
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.minAge ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* Included/Excluded Section */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              What's Included & Excluded
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-gray-100">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-foreground">
                  <Plus className="text-green-500" /> Included
                </h3>
                <ul className="list-none space-y-2 text-foreground">
                  {tour.included?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" p-6 rounded-xl border border-gray-100">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-foreground">
                  <Minus className="text-red-500" /> Excluded
                </h3>
                <ul className="list-none space-y-2 text-foreground">
                  {tour.excluded?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* Amenities & Tour Plan Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Additional Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tour.amenities && tour.amenities.length > 0 && (
                <div className=" p-6 rounded-xl border border-gray-100">
                  <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-foreground">
                    <List className="text-purple-500" /> Amenities
                  </h3>
                  <ul className="list-none space-y-2 text-foreground">
                    {tour.amenities.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.tourPlan && tour.tourPlan.length > 0 && (
                <div className=" p-6 rounded-xl border border-gray-100">
                  <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-foreground">
                    <Clock className="text-orange-500" /> Tour Plan
                  </h3>
                  <ul className="list-none space-y-2 text-foreground">
                    {tour.tourPlan.map((plan, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        {plan}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
        {/* Sidebar Column (Empty for now, could be used for a any purpose) */}
        <div className="hidden md:block">
          {/* This column can be used for other sidebar content */}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
