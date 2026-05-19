export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>; // ← Promise type
}) {
  const { error } = await searchParams; // ← await it

  const message = error ?? "Something went wrong with your confirmation link.";

  return (
    <main className="flex justify-center items-center bg-muted/40 px-4 min-h-screen">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-2xl">Authentication error</h1>
        <p className="text-muted-foreground">{message}</p>
        <div className="flex justify-center gap-4">
          <a href="/auth/login" className="text-primary hover:underline">
            Back to login
          </a>
          <a href="/auth/register" className="text-primary hover:underline">
            Create a new account
          </a>
        </div>
      </div>
    </main>
  );
}
