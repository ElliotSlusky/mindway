// @ts-nocheck
"use client";
import CalendarDayCell from "@/components/dashboard/calendar/CalendarDayCell";
import CalendarEditOverlay from "@/components/dashboard/overlays/CalendarEditOverlay";
import { ClockIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

import axios from "axios";
import Cookies from 'js-cookie';

const monthsArray = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"
]

export type DayType = {
  date: string;
  events: {
    id: number;
    name: string;
    time: string;
    datetime: string;
    href: string;
  }[];
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
};
type DaysType = DayType[];
function generateCalendarDays(year, month) {
  let days = [];

  // JavaScript months are 0-indexed (0 for January, 11 for December)
  let firstDayOfMonth = new Date(year, month - 1, 1);
  let lastDayOfMonth = new Date(year, month, 0);

  // Start from the previous Monday if the first day of the month is not Monday
  let startDay = new Date(firstDayOfMonth);
  startDay.setDate(startDay.getDate() - (startDay.getDay() || 7) + 1);

  // Continue until the end of the week of the last day of the month
  let endDay = new Date(lastDayOfMonth);
  endDay.setDate(endDay.getDate() + (7 - endDay.getDay()));

  let currentDate = new Date(startDay);
  while (currentDate <= endDay) {
    let dayInfo = {
      date: currentDate.toISOString().split('T')[0],
      events: [],
      isCurrentMonth: (currentDate.getMonth() + 1 === month)
    };
    days.push(dayInfo);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}
function hasBeenSet(localDate, tracking) {
  console.log("hasBeenSet function is called"); // Added console log

  if (!tracking) {
    return false;
  }

  let dateString = localDate instanceof Date ? localDate.toISOString().split('T')[0] : localDate;
  console.log(dateString);

  let found = tracking.find((element) => element.localDate === dateString);
  console.log(found);

  return found !== undefined;
}





export default function Example() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log("mounted")
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    if (token && email) {
      axios.post('https://elliot-server.ngrok.dev/getUserData', { email: email, token: token }).then((res) => {
        console.log(res.data)
        if (res.data.status) {
          setUser(res.data.data)
        }
        else {
          window.location.href = '/';
        }
      })
    }
    else {
      window.location.href = '/';
    }

  }
    , []);

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  let days = generateCalendarDays(selectedYear, selectedMonth);

  const selectedDay = days.find((day) => day.isSelected);

  const upMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1)
      setSelectedYear(selectedYear + 1)
    }
    else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const downMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12)
      setSelectedYear(selectedYear - 1)
    }
    else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  return (
    <div className="lg:flex  lg:flex-col">

      <div class="flex justify-between">
        <div class=" w-1/4">
          <div className="mb-3 text-xl font-bold float-left">
            {monthsArray[selectedMonth - 1]}{", "}{selectedYear}
          </div>          </div>

        <div class="w-1/2"></div>

        <div class=" w-1/4">
          <div className="float-right flex">
            <div className="" onClick={downMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
            <div className="ml-2" onClick={upMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>


      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <CalendarDayCell day={day} key={day.date} user={user} />
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={twMerge(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                  !day.isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10 "
                )}
              >
                <time
                  dateTime={day.date}
                  className={twMerge(
                    day.isSelected &&
                    "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {
        selectedDay?.events.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
              {selectedDay.events.map((event) => (
                <li
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <time
                      dateTime={event.datetime}
                      className="mt-2 flex items-center text-gray-700"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {event.time}
                    </time>
                  </div>
                  <a
                    href={event.href}
                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >

                    Edit
                    <span className="sr-only">, {event.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )
      }
    </div >
  );
}
