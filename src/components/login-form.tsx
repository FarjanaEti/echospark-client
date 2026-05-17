"use client";

import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

const DEMO_ACCOUNTS = [
  { role: "Admin",    email: "admin@demo.com",    password: "admin123" },
  { role: "Customer", email: "customer@demo.com", password: "customer123" },
  { role: "Provider", email: "provider@demo.com", password: "provider123" },
] as const;

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        toast.success("User Logged in Successfully", { id: toastId });
        await new Promise((resolve) => setTimeout(resolve, 500));
        window.location.href = "/";
      } catch {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 justify-end">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>

        {/* Demo accounts */}
        <div className="w-full">
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Try a demo</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {DEMO_ACCOUNTS.map(({ role, email, password }) => (
              <Button
                key={role}
                variant="outline"
                type="button"
                className="w-full justify-between text-sm"
                onClick={() => {
                  form.setFieldValue("email", email);
                  form.setFieldValue("password", password);
                }}
              >
                <span>Demo as {role}</span>
                <span className="text-xs text-muted-foreground">{email}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}