import { Button } from "@/components/ui/button";
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
import { useCreateTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createSchema = z.object({
  name: z
    .string({ error: "Tour type name must be string" })
    .min(3, {
      error: "Tour type name is too short",
    })
    .max(50, { error: "Tour type name is too long" }),
});

const AddTourTypeModal = () => {
  const [open, setOpen] = useState(false);
  const [createTourType, { isLoading }] = useCreateTourTypeMutation();
  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: { name: string }) => {
    const toastId = toast.loading("Adding...");
    try {
      const res = await createTourType({ name: values.name }).unwrap();
      if (res.success) {
        toast.success("Tour Type added successfully", { id: toastId });
        setOpen(false);
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
          <PlusCircle /> Add Tour Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour Type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="addTourType"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name*" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your tour type name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            type="submit"
            form="addTourType"
            className="cursor-pointer text-white"
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourTypeModal;
