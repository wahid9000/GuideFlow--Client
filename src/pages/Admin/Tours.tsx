import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash, ViewIcon } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useDeleteTourMutation,
  useGetToursQuery,
} from "@/redux/features/tour/tour.api";
import ViewTourModal from "@/components/modules/Admin/Tour/ViewTourModal";
import type { ITour } from "@/types/tour.type";

const Tours = () => {
  const { data: tourData } = useGetToursQuery(undefined);
  const data = tourData?.data;
  const meta = tourData?.meta;

  const [deletTour] = useDeleteTourMutation();
  const handleDeleteTour = async (tourId: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deletTour(tourId).unwrap();
      if (res.success) {
        toast.success("Tour Deleted Successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Tours</h1>
        <AddTourModal />
      </div>
      <div className="border border-muted round-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((tour: ITour) => (
              <TableRow key={tour._id}>
                <TableCell className="font-medium">
                  <img
                    src={tour.images[0]}
                    alt={tour.title || "Thumbnail"}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </TableCell>

                <TableCell className="font-medium">{tour.title}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          {tour.description.length > 20
                            ? tour.description.slice(0, 20) + "..."
                            : tour.description}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white border border-gray-700 shadow-lg rounded-md p-2 max-w-xs break-words">
                        <p>{tour.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                <TableCell>
                  {new Date(tour.createdAt).toLocaleString()}
                </TableCell>

                <TableCell>
                  <div className="gap-2 flex  items-center">
                    <ViewTourModal tour={tour} />
                    <Button variant={"outline"} className="cursor-pointer">
                      <EditIcon />
                    </Button>
                    <DeleteConfirmation
                      onConfirm={() => handleDeleteTour(tour._id)}
                    >
                      <Button
                        variant={"destructive"}
                        className="cursor-pointer"
                      >
                        <Trash />
                      </Button>
                    </DeleteConfirmation>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tours;
