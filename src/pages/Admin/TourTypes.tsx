import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useState } from "react";
import { cn } from "@/lib/utils";

const TourTypes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const { data } = useGetTourTypesQuery({ page: currentPage, limit: 10 });
  const [deleteTourType] = useDeleteTourTypeMutation();

  const totalPage = data?.meta?.totalPage || 1;

  const handleDeleteTourType = async (tourTypeId: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteTourType(tourTypeId).unwrap();
      if (res.success) {
        toast.success("Tour Type Deleted Successfully", { id: toastId });
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
            {data?.data?.map(
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
      {totalPage > 1 && (
        <div className="mt-4">
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
      )}
    </div>
  );
};

export default TourTypes;
