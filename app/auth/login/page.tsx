"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginSchema } from "@/lib/validations/auth";

// ShadCN
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginSchema) {
    setIsSubmitting(true);
    setServerError(null);

    setServerError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setServerError("Invalid email or password");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex justify-center items-center bg-muted/40 px-4 min-h-screen">
      <Card className="space-y-3 shadow-lg w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Log in to continue to your financial dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="pb-6">
            <FieldGroup>
              {serverError && (
                <div className="bg-destructive/10 px-3 py-2 border border-destructive/30 rounded-md text-destructive text-sm">
                  {serverError}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email ? (
                  <FieldError>{errors.email.message}</FieldError>
                ) : (
                  <FieldDescription>
                    Use the email connected to your account.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Logging in...">
              Log In
            </Button>

            <p className="text-muted-foreground text-sm text-center">
              No account yet?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary hover:underline underline-offset-4">
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
