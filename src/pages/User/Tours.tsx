import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { ITour } from "@/types";
import { Link } from "react-router";

const Tours = () => {
  const { data: tourData } = useGetToursQuery(undefined);
  const tours: ITour[] = tourData || [];
  // const meta = tourData?.meta;

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Tours</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour._id}
            className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
          >
            {/* Carousel */}
            <CardHeader>
              {tour.images.length > 0 && (
                <div className="relative h-48 w-full">
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 2000,
                      }),
                    ]}
                    className="relative h-full"
                  >
                    <CarouselContent>
                      {tour.images.map((img, i) => (
                        <CarouselItem key={i}>
                          <img
                            src={img}
                            alt={`Tour Image ${i + 1}`}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              )}
            </CardHeader>

            {/* Tour Info */}
            <CardContent className="p-4 flex flex-col gap-3">
              <CardTitle className="text-lg font-bold text-foreground">
                {tour.title}
              </CardTitle>

              <p className="text-sm text-foreground line-clamp-3">
                {tour.description}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-extrabold text-foreground">
                  ${tour.costFrom}
                </p>

                <span className="text-sm text-foreground">
                  Max {tour.maxGuest} guests
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-foreground mt-2">
                <p>
                  <span className="font-semibold">From:</span>{" "}
                  {tour.departureLocation}
                </p>
                <p>
                  <span className="font-semibold">To:</span>{" "}
                  {tour.arrivalLocation}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {Math.ceil(
                    (new Date(tour.endDate).getTime() -
                      new Date(tour.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
                <p>
                  <span className="font-semibold">Min Age:</span> {tour.minAge}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {tour.included.slice(0, 2).map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-white text-xs px-2 py-1 rounded-md"
                  >
                    {item}
                  </span>
                ))}

                {tour.included.length > 2 && (
                  <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded-md">
                    +{tour.included.length - 2} more
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4">
              <div className="w-full">
                <Link to={`/tours/${tour.slug}`}>
                  <Button className="w-full cursor-pointer text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tours;
