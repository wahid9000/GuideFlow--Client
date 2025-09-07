import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import AddTourTypeModal from "@/components/modules/Admin/TourType/AddTourTypeModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { toast } from "sonner";

const TourTypes = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [deleteTourType] = useDeleteTourTypeMutation();

  const handleDeleteTourType = async (tourTypeId: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteTourType(tourTypeId).unwrap();
      if (res.success) {
        toast.success("Tour Type Deleted Successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted round-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (tourType: { _id: string; name: string; createdAt: string }) => (
                <TableRow key={tourType._id}>
                  <TableCell className="font-medium">{tourType.name}</TableCell>
                  <TableCell>{tourType.createdAt}</TableCell>
                  <TableCell>
                    <div className="gap-2 flex  items-center">
                      <Button variant={"outline"} className="cursor-pointer">
                        <EditIcon />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleDeleteTourType(tourType._id)}
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
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TourTypes;
