import { DayType } from "@/app/dashboard/calendar/page";
import CalendarEditOverlay from "../overlays/CalendarEditOverlay";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CalendarDayCell({ day, user }: { day: DayType, user: any }) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <CalendarEditOverlay isOpen={isOpen} setOpen={setOpen} day={day} user={user} />
      <div
        className={twMerge(
          day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
          "relative px-3 py-2"
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <time
          dateTime={day.date}
          className={
            day.isToday
              ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
              : undefined
          }
        >
          {/* @ts-ignore */}
          {day.date.split("-").pop().replace(/^0/, "")}
        </time>
        <div className="h-10"></div>
        {day.events.length > 0 && (
          <ol className="mt-2">
            {day.events.slice(0, 2).map((event) => (
              <li key={event.id}>
                <a href={event.href} className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {event.name}
                  </p>
                  <time
                    dateTime={event.datetime}
                    className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                  >
                    {event.time}
                  </time>
                </a>
              </li>
            ))}
            {day.events.length > 2 && (
              <li className="text-gray-500">+ {day.events.length - 2} more</li>
            )}
          </ol>
        )}
      </div>
    </>
  );
}
