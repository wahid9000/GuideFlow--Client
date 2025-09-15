import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const TourCardSkeleton = () => (
  <Card className="shadow-md rounded-xl animate-pulse">
    <CardHeader>
      <div className="h-36 w-full bg-gray-300 rounded-t-xl" />
    </CardHeader>
    <CardContent className="px-5 flex flex-col gap-2">
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
      <div className="h-6 w-1/2 bg-gray-300 rounded mt-2" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-16 bg-gray-300 rounded" />
        <div className="h-6 w-16 bg-gray-300 rounded" />
      </div>
    </CardContent>
    <CardFooter className="px-4">
      <div className="h-10 w-full bg-gray-300 rounded" />
    </CardFooter>
  </Card>
);
