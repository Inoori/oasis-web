import type { FallbackProps } from "react-error-boundary";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiArrowLongLeft, HiMiniFaceFrown } from "react-icons/hi2";
import { Button } from "./ui/button";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="flex w-3xl items-center justify-center border-0 bg-background">
        <CardHeader className="flex w-full flex-col items-center text-2xl">
          <HiMiniFaceFrown />
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error has occurred. Please try again.
          </CardDescription>
        </CardHeader>
        {import.meta.env.MODE === "development" && (
          <CardContent className="flex w-full items-center justify-center">
            <pre className="text-sm wrap-break-word whitespace-pre-wrap text-red-500">
              {(error as any)?.message}
            </pre>
          </CardContent>
        )}

        <CardFooter className="flex-col gap-2">
          <Button className="cursor-pointer" onClick={resetErrorBoundary}>
            <HiArrowLongLeft />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
