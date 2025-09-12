import SingleImageUploader from "@/components/SingleImageUploader";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const divisionCreateSchema = z.object({
  name: z.string().min(3, { error: "Name is too short" }),
  description: z
    .string()
    .min(5, { error: "Description is too short" })
    .max(150, { error: "Description is too long" }),
});

const AddDivisionModal = () => {
  const [open, setOpen] = useState(false);
  const [createDivision, { isLoading }] = useCreateDivisionMutation();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof divisionCreateSchema>>({
    resolver: zodResolver(divisionCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    const toastId = toast.loading("Adding...");
    try {
      const res = await createDivision(formData).unwrap();
      if (res.success) {
        toast.success("Division added successfully", { id: toastId });
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
          <PlusCircle /> Add Division
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" mb-4">
          <DialogTitle>Add Division</DialogTitle>
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
                  <FormControl>
                    <Input placeholder="Name*" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your division name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description*" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your description name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <SingleImageUploader setImage={setImage} />
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

export default AddDivisionModal;
