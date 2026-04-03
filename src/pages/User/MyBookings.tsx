import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IBooking } from "@/types";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
import { usePDF } from 'react-to-pdf';

const MyBookings = () => {
  const { data: bookings, isLoading } = useGetMyBookingsQuery(undefined);
  const { toPDF, targetRef } = usePDF({ filename: "my-bookings.pdf" });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Button onClick={() => toPDF()}>Download PDF</Button>
      </div>
      <div ref={targetRef} className="space-y-4">
        {bookings?.map((booking: IBooking) => (
          <Card key={booking._id}>
            <CardHeader>
              <CardTitle>{booking.tour.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge
                      variant={
                        booking.status === "COMPLETE" ? "default" : "secondary"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guestCount}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(booking.tour.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(booking.tour.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Cost:</strong> $
                    {booking.tour.costFrom * booking.guestCount}
                  </p>
                  <p>
                    <strong>Location:</strong> {booking.tour.location}
                  </p>
                  <p>
                    <strong>Division:</strong> {booking.tour.division.name}
                  </p>
                  {booking.payment && (
                    <p>
                      <strong>Payment Status:</strong> {booking.payment.status}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
