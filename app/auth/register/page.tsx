"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterSchema } from "@/lib/validations/auth";

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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterSchema) {
    setServerError(null);

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { name: values.name },
        emailRedirectTo: `${location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setSentEmail(values.email);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="flex justify-center items-center bg-muted/40 px-4 min-h-screen">
        <Card className="space-y-3 shadow-lg w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-2xl">
              Check your email
            </CardTitle>
            <CardDescription>
              We sent a confirmation link to{" "}
              <span className="font-medium text-foreground">{sentEmail}</span>.
              Click it to activate your account.
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/auth/login">Back to login</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center bg-muted/40 px-4 min-h-screen">
      <Card className="space-y-3 shadow-lg w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-2xl">Create account</CardTitle>
          <CardDescription>
            Start managing your family finances today
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
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  {...register("name")}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

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
                    We’ll send a confirmation link to this email.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
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
              loadingText="Creating account...">
              Create account
            </Button>

            <p className="text-muted-foreground text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline underline-offset-4">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
