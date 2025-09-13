import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { useParams } from "react-router";

const TourDetails = () => {
  const { slug } = useParams();
  const { data } = useGetSingleTourQuery(slug);
  console.log("🚀 ~ TourDetails ~ getSingleTour:", data);
  return (
    <div>
      <h1>Tour Detail</h1>
    </div>
  );
};

export default TourDetails;
