import { Spinner } from "@/components/ui/spinner";
import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function TodayActivity() {
  const { data, isPending } = useTodayActivity();
  const activity = data?.value || [];

  return (
    <div className="col-span-2 flex flex-col gap-6 rounded-md bg-accent p-8 pt-6 pr-3">
      <h2 className="text-2xl font-semibold">Today</h2>
      {isPending ? (
        <Spinner className="size-4" />
      ) : activity.length > 0 ? (
        <ul className="scrollbar-thin overflow-auto overflow-x-hidden pr-4 scrollbar-thumb-primary-foreground">
          {activity.map((booking, index) => (
            <React.Fragment key={booking.Id}>
              <TodayItem stay={booking} />
              {index < activity.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-center text-lg font-medium">
          No activity today...
        </p>
      )}
    </div>
  );
}
