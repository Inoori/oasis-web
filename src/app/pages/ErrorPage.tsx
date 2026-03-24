import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/useMoveBack";

export default function ErrorPage({ error }: { error: unknown }) {
  const err = error as any;

  const moveBack = useMoveBack();
  return (
    <main className="flex h-screen items-center justify-center bg-background p-12">
      <div className="not-last-of-type: flex-[0_1_960px] rounded-md p-12 text-center">
        <h1 className="mb-8 text-3xl font-bold">
          Something went wrong,Please try again later 😢
        </h1>
        <p className="mb-8 text-xs text-red-500">
          {err?.message || "An unexpected error occurred."}
        </p>

        <Button onClick={moveBack} size="lg">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}
