import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, formatISO } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useCreateTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import z from "zod";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { toast } from "sonner";
import type { FileMetadata } from "@/hooks/use-file-upload";

const createSchema = z.object({
  title: z
    .string({ error: "Tour name must be string" })
    .min(3, {
      error: "Tour name is too short",
    })
    .max(30, { error: "Tour name is too long" }),
  division: z.string({ error: "Division must be string" }),
  tourType: z.string({ error: "Tour Type must be string" }),
  description: z
    .string({ error: "Description must be string" })
    .min(5, {
      error: "Description is too short",
    })
    .max(150, { error: "Description is too long" }),
  startDate: z.date({ error: "Start Date is required" }),
  endDate: z.date({ error: "End Date is required" }),
});

const AddTourModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [createTour] = useCreateTourMutation();
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Tour...");
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

    try {
      const res = await createTour(formData).unwrap();
      if (res) {
        toast.success("Tour added successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer">
          <PlusCircle /> Add Tour
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2">Add New Tour</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="addTourType"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name*" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    {" "}
                    {/* full width */}
                    <FormLabel>Division</FormLabel>
                    <Select
                      disabled={divisionLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          {" "}
                          {/* full width select */}
                          <SelectValue placeholder="Select a division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionData?.data.map(
                          (division: { _id: string; name: string }) => (
                            <SelectItem key={division._id} value={division._id}>
                              {division.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    {" "}
                    {/* full width */}
                    <FormLabel>Tour Type</FormLabel>
                    <Select
                      disabled={tourTypeLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          {" "}
                          {/* full width select */}
                          <SelectValue placeholder="Select a TourType" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypeData?.map(
                          (tourType: { _id: string; name: string }) => (
                            <SelectItem key={tourType._id} value={tourType._id}>
                              {tourType.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5 items-center">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5 items-stretch">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                      <Textarea
                        className="h-[200px] text-base"
                        placeholder="Description*"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-1 mt-5">
                <MultipleImageUploader setImages={setImages} />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={false}
            type="submit"
            form="addTourType"
            className="cursor-pointer text-white"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourModal;
