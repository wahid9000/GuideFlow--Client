import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";

const MyBookings = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { data } = useGetMyBookingsQuery();
  return <div>My Bookings</div>;
};

export default MyBookings;
