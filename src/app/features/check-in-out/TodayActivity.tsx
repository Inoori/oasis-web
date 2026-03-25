import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HiOutlineBellSlash } from "react-icons/hi2";

export default function TodayActivity() {
  const { data } = useTodayActivity();
  const activity = data?.value || [];

  return (
    <div className="col-span-2 flex flex-col gap-6 rounded-md bg-accent p-8 pt-6 pr-3">
      <h2 className="text-2xl font-semibold">Today</h2>
      {activity.length > 0 ? (
        <ul className="scrollbar-thin overflow-auto overflow-x-hidden pr-4 scrollbar-thumb-primary-foreground">
          {activity.map((booking, index) => (
            <React.Fragment key={booking.Id}>
              <TodayItem stay={booking} />
              {index < activity.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <Empty className="h-full justify-start bg-muted/30">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HiOutlineBellSlash className="size-7" />
            </EmptyMedia>
            <EmptyTitle>No Activity</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              No check-ins or check-outs scheduled for today.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent></EmptyContent>
        </Empty>
      )}
    </div>
  );
}
