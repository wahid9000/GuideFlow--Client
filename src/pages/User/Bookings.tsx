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
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { toast } from "sonner";
import { format } from "date-fns";

const Bookings = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSingleTourQuery(slug);
  const tour = data ?? ({} as ITour);
  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();
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
    const toastId = toast.loading("Please wait...");
    let bookingData;
    if (data) {
      bookingData = {
        tour: tour._id,
        guestCount: guestCount,
      };
      console.log("🚀 ~ handleBooking ~ bookingData:", bookingData);
    }

    try {
      const res = await createBooking(bookingData).unwrap();
      console.log("🚀 ~ handleBooking ~ res:", res);
      if (res.success) {
        toast.success("Booking created successfully", { id: toastId });
        if (res.data.paymentUrl) {
          window.open(res.data.paymentUrl);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message, { id: toastId });
    }
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
                    {format(tour?.startDate, "PP")} to{" "}
                    {format(tour?.endDate, "PP")}
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
            <div className="border border-blue-300 p-8 rounded-2xl shadow-lg">
              <div className="flex flex-col gap-2 mb-6">
                <h3 className="text-3xl font-extrabold text-foreground">
                  Booking Summary
                </h3>
              </div>

              {/* Price per person and guest count */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    Price per Person:
                  </span>
                  <div className="font-bold text-lg text-foreground">
                    ${tour.costFrom}
                  </div>
                </div>

                {/* Guests counter */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Guests:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-blue-600 text-foreground hover:bg-blue-100"
                      onClick={() => decrementGuest()}
                      disabled={guestCount <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-bold text-foreground">
                      {guestCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-blue-600 text-foreground hover:bg-blue-100"
                      onClick={() => incrementGuest()}
                      disabled={guestCount >= tour!.maxGuest}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Booking duration */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    Duration:
                  </span>
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4" />
                    <p className="font-medium text-sm">
                      <p className="font-semibold text-foreground">
                        {format(tour?.startDate, "PP")} to{" "}
                        {format(tour?.endDate, "PP")}
                      </p>
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Total amount section */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-foreground">
                  Total:
                </span>
                <span className="text-3xl font-extrabold text-foreground">
                  ${totalAmount}
                </span>
              </div>

              <Button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full cursor-pointer bg-blue-950 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
              >
                {bookingLoading ? "Confirming..." : "Book Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
