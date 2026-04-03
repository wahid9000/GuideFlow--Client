import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { IUser, IUpdateUser } from "@/types";

const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name is too long" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: "Please enter a valid Bangladeshi phone number",
    })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, { message: "Address can be maximum 200 characters" })
    .optional()
    .or(z.literal("")),
});

interface ProfileFormProps {
  user: IUser;
  onSuccess?: () => void;
}

const ProfileForm = ({ user, onSuccess }: ProfileFormProps) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileUpdateSchema>) => {
    const updateData: IUpdateUser = {};

    // Only include fields that have values and are different from original
    if (data.name && data.name !== user.name) {
      updateData.name = data.name;
    }
    if (data.phone && data.phone !== user.phone) {
      updateData.phone = data.phone;
    }
    if (data.address && data.address !== user.address) {
      updateData.address = data.address;
    }

    // If no changes, show message
    if (Object.keys(updateData).length === 0) {
      toast.info("No changes to update");
      return;
    }

    const toastId = toast.loading("Updating profile...");

    try {
      const response = await updateUser({
        id: user._id,
        data: updateData,
      }).unwrap();

      if (response.success) {
        toast.success("Profile updated successfully!", { id: toastId });
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", { id: toastId });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information. Password changes are handled
          separately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+8801XXXXXXXXX or 01XXXXXXXXX"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address"
                      disabled={isLoading}
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
