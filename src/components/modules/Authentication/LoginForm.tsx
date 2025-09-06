import { Button } from "@/components/ui/button";
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
import Password from "@/components/ui/Password";
import config from "@/config";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { error: "Password is too short" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain atleast 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain 1 special character",
    }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const authInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(authInfo).unwrap();
      if (result) {
        toast.success("User logged In successfully");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.message === "Password is not correct") {
        toast.error("Invalid Credentials");
      }

      if (error.data.message === "User is not verified") {
        toast.error("Your account is not verified. Please Verify ...");
        navigate("/verify", { state: data.email });
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full text-white">
                Submit
              </Button>
            </form>
          </Form>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button
            onClick={() => window.open(`${config.baseUrl}/auth/google`)}
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
          >
            Login with Google
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              replace
              className="underline underline-offset-4"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
