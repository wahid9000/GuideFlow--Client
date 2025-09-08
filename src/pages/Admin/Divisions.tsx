import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
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
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Divisions = () => {
  const { data } = useGetDivisionsQuery(undefined);

  const handleDeleteDivision = async (divisionId: string) => {
    const toastId = toast.loading("Deleting...");
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Divisions</h1>
        <AddDivisionModal />
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
            {data?.data?.map(
              (division: {
                _id: string;
                thumbnail: string;
                name: string;
                description: string;
                createdAt: string;
              }) => (
                <TableRow key={division._id}>
                  <TableCell className="font-medium">
                    <img
                      src={division.thumbnail}
                      alt={division.name || "Thumbnail"}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                  </TableCell>

                  <TableCell className="font-medium">{division.name}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            {division.description.length > 20
                              ? division.description.slice(0, 20) + "..."
                              : division.description}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white border border-gray-700 shadow-lg rounded-md p-2 max-w-xs break-words">
                          <p>{division.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  <TableCell>{division.createdAt}</TableCell>
                  <TableCell>
                    <div className="gap-2 flex  items-center">
                      <Button variant={"outline"} className="cursor-pointer">
                        <EditIcon />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleDeleteDivision(division._id)}
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

export default Divisions;
