import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import type { ITour } from "@/types";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { TourCardSkeleton } from "@/components/skeletons/ToursCardSkeleton";
import { ArrowBigRightIcon } from "lucide-react";
import TourFilter from "@/components/modules/User/Tour/TourFilter";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Tours = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: tourData, isLoading } = useGetToursQuery({
    division: selectedDivision,
    tourType: selectedTourType,
    limit: 3,
    page: currentPage,
  });
  const tours: ITour[] = tourData?.data || [];
  const meta = tourData?.meta;

  const totalPage = meta?.totalPage || 1;

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-64">
        <img
          src="https://res.cloudinary.com/dungmnjyx/image/upload/v1757871187/sh6opioil9q-1757871184092-gettyimages-1432538580-avif.avif.avif"
          alt="Tours Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold">
            Explore Amazing Tours
          </h1>
        </div>
      </section>

      <div className="px-4 py-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <TourFilter />
          {/* Tour Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TourCardSkeleton key={i} />
              ))
            ) : tours.length > 0 ? (
              tours.map((tour) => (
                <Card
                  key={tour._id}
                  className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
                >
                  <Link to={`/tours/${tour.slug}`}>
                    <CardHeader>
                      {tour.images.length > 0 && (
                        <div className="relative h-36 w-full">
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
                                    className="w-full h-40 object-cover rounded-t-xl"
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </Carousel>

                          <Badge
                            variant="default"
                            className="absolute top-2 right-2 bg-blue-950 text-white text-xs px-2 py-1 rounded-md shadow-md"
                          >
                            {(() => {
                              const days = Math.ceil(
                                (new Date(tour.endDate).getTime() -
                                  new Date(tour.startDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              );
                              return `${days} ${
                                days > 1 ? "Days" : "Day"
                              } Tour`;
                            })()}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>
                  </Link>

                  <CardContent className="px-5 flex flex-col gap-2">
                    <CardTitle className="text-lg font-bold text-foreground">
                      {tour.title}
                    </CardTitle>

                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-extrabold text-foreground">
                        ${tour.costFrom}
                      </p>
                      <span className="text-sm text-foreground">
                        Max {tour.maxGuest} guests
                      </span>
                    </div>

                    <div className="flex items-center justify-start text-sm">
                      <p className="text-gray-700 mr-1">
                        {tour.departureLocation}
                      </p>
                      <p className="mr-1">
                        <ArrowBigRightIcon className="w-4 h-4 text-green-900" />
                      </p>
                      <p className="text-gray-700">{tour.arrivalLocation}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {tour.included.slice(0, 2).map((item, index) => (
                        <span
                          key={index}
                          className="bg-blue-950 text-white text-xs px-2 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}

                      {tour.included.length > 2 && (
                        <span className="bg-blue-950 text-white text-xs px-2 py-1 rounded-md">
                          +{tour.included.length - 2} more
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="px-4">
                    <div className="w-full">
                      <Link to={`/tours/${tour.slug}`}>
                        <Button className="w-full bg-blue-950 cursor-pointer text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <h3 className="flex justify-center items-center text-xl font-bold">
                No Tour Found
              </h3>
            )}
          </div>
        </div>
      </div>
      {totalPage > 1 && (
        <div className=" justify-end flex px-4 py-2 container mx-auto">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      currentPage === 1
                        ? "pointer-events-none cursor-none opacity-50"
                        : "cursor-pointer pointer-events-auto"
                    )}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      className="cursor-pointer"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink
                        className={cn(
                          currentPage === page &&
                            "bg-blue-950 text-white hover:bg-blue-800 hover:text-white"
                        )}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationLink></PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      currentPage === totalPage
                        ? "pointer-events-none cursor-none opacity-50"
                        : "cursor-pointer pointer-events-auto"
                    )}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default Tours;
