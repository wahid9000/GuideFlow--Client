import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import { useParams } from "react-router";
import { Separator } from "@/components/ui/separator"; // Assuming you have this
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  PlaneLanding,
  PlaneTakeoff,
  MinusCircle,
  PlusCircle,
} from "lucide-react"; // Importing some icons
import { Button } from "@/components/ui/button";
import { BookingSkeleton } from "@/components/skeletons/BookingSkeleton";
import { useEffect, useState } from "react";

const Bookings = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSingleTourQuery(slug);
  const tour = data ?? ({} as ITour);
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tour!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  if (isLoading) {
    return <BookingSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-4 md:py-4">
        <h3>Something Went Wrong!!!</h3>
      </div>
    );
  }

  const incrementGuest = () => {
    setGuestCount((prev) => prev + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prev) => prev - 1);
  };

  const handleBooking = async () => {
    console.log(guestCount);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-4">
      <div className="relative w-full h-40 rounded-3xl overflow-hidden mb-12 shadow-xl">
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-foreground">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
            {tour.title}
          </h1>
          <p className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            {tour.location ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Description
            </h2>
            <p className="text-foreground leading-relaxed text-justify">
              {tour.description}
            </p>
          </section>

          <Separator className="my-10" />

          {/* Tour Details Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Tour Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl  border border-gray-100">
                <Clock className="h-6 w-6 text-foreground" />
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
              <div className="flex items-center gap-4 p-4 rounded-xl  border border-gray-100">
                <Users className="h-6 w-6 text-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Max Guests
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.maxGuest} guests
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl  border border-gray-100">
                <PlaneLanding className="h-6 w-6 text-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Arrival Location
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.arrivalLocation ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl  border border-gray-100">
                <PlaneTakeoff className="h-6 w-6 text-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Departure Location
                  </h4>
                  <p className="font-semibold text-foreground">
                    {tour.departureLocation ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              What's Included
            </h2>
            <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-8 text-foreground list-none">
              {tour.included?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-950 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar Column (Booking Card) */}
        <div className="md:col-span-1 order-first md:order-last">
          <div className="md:sticky md:top-20 md:mt-24">
            <div className="border border-blue-300 p-8 rounded-2xl shadow-lg bg-white">
              <div className="flex flex-col gap-2 mb-6">
                <h3 className="text-3xl font-extrabold text-gray-900">
                  Booking Summary
                </h3>
              </div>

              {/* Price per person and guest count */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Price per Person:
                  </span>
                  <div className="font-bold text-lg text-blue-600">
                    ${tour.costFrom}
                  </div>
                </div>

                {/* Guests counter */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Guests:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-blue-600 text-blue-600 hover:bg-blue-100"
                      onClick={() => decrementGuest()}
                      disabled={guestCount <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-bold text-gray-900">
                      {guestCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-blue-600 text-blue-600 hover:bg-blue-100"
                      onClick={() => incrementGuest()}
                      disabled={guestCount >= tour!.maxGuest}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Booking duration */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <p className="font-medium text-sm">
                      {new Date(tour.startDate).toLocaleDateString()} to{" "}
                      {new Date(tour.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Total amount section */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-extrabold text-blue-600">
                  ${totalAmount}
                </span>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
