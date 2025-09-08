import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Please enter a valid 6-digit OTP.",
  }),
});

const Verify = () => {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOTPMutation();
  const [verifyOtp] = useVerifyOTPMutation();
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) return;
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : prev));
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending OTP");
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent Successfully", { id: toastId });
        setConfirmed(true);
        setTimer(120);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (values: { otp: string }) => {
    const toastId = toast.loading("Verifying...");
    try {
      const res = await verifyOtp({ email: email, otp: values.otp }).unwrap();
      if (res.success) {
        toast.success("Verified Successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Invalid OTP", { id: toastId });
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-muted/30">
      {confirmed ? (
        <Card className="w-[380px] shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              OTP Verification
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleVerify)}
                className="space-y-5 text-center"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            {" "}
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            {" "}
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            {" "}
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            {" "}
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="cursor-pointer text-white w-full "
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col mx-auto">
              <p>Time Remaining: {timer}</p>
              <Button
                onClick={handleSendOTP}
                disabled={timer !== 0}
                className={cn("mx-auto", {
                  "text-gray-600": timer !== 0,
                  "cursor-pointer": timer === 0,
                })}
                variant={"link"}
              >
                Resend OTP
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[380px] text-center shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Email Verification is required
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              We will send you an OTP at
              <span className="font-medium"> {email}</span>
            </CardDescription>
          </CardHeader>

          <CardFooter className="mx-auto">
            <Button
              onClick={handleSendOTP}
              className="cursor-pointer text-white"
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
