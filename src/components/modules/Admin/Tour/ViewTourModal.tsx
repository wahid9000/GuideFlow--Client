"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Eye } from "lucide-react";
import { useState } from "react";
import type { ITour } from "@/types/tour.type";

const ViewTourModal = ({ tour }: { tour: ITour }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto scrollbar-hide px-6 py-10 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DialogHeader className="p-0">
              <DialogTitle className="text-2xl font-bold mb-2 text-foreground">
                {tour.title}
              </DialogTitle>
              <p className="text-foreground">{tour.description}</p>
            </DialogHeader>
          </div>

          {tour.images.length > 0 && (
            <div className="relative max-w-87.5 mx-auto">
              <Carousel className="relative">
                <CarouselContent>
                  {tour.images.map((img: any, i: any) => (
                    <CarouselItem key={i}>
                      <img
                        src={img}
                        alt={`Tour Image ${i + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 " />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Start Date :</h3>
            <p className="text-foreground">
              {new Date(tour.startDate).toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              End Date
            </h3>
            <p className="text-foreground">
              {new Date(tour.endDate).toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Location</h3>
            <p className="text-foreground">{tour.location ?? "N/A"}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Cost</h3>
            <p className="text-foreground">€{tour.costFrom ?? "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Min Age</h3>
            <p className="text-foreground">{tour.minAge ?? "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Max Guests</h3>
            <p className="text-foreground">{tour.maxGuest ?? "N/A"}</p>
          </div>
        </div>
        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Arrival Location</h3>
            <p className="text-foreground">{tour.arrivalLocation ?? "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Departure Location</h3>
            <p className="text-foreground">{tour.departureLocation ?? "N/A"}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Included</h3>
            <ul className="list-disc list-inside text-foreground">
              {tour.included?.map((item: any, idx: any) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Excluded</h3>
            <ul className="list-disc list-inside text-foreground">
              {tour.excluded?.map((item: any, idx: any) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tour.amenities && tour.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <ul className="list-disc list-inside text-foreground">
                {tour.amenities.map((item: any, idx: any ) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tour.tourPlan && tour.tourPlan.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tour Plan</h3>
              <ul className="list-disc list-inside text-foreground">
                {tour.tourPlan.map((plan: any, idx: any) => (
                  <li key={idx}>{plan}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTourModal;
