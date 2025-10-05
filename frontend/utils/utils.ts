import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CalendarDateTime,
  fromDate,
  getLocalTimeZone,
  toTimeZone,
  ZonedDateTime,
} from "@internationalized/date";

import { authRoutes, publicRoutes } from "@/lib/route";

export const isPublicRoute = (pathname: string) => {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
};

export function getDurationString(
  from: Date | CalendarDateTime | ZonedDateTime,
  to: Date | CalendarDateTime | ZonedDateTime,
): string {
  const fromDate = toDateFunc(from).getTime();
  const toDate = toDateFunc(to).getTime();
  const diffMs = Math.abs(toDate - fromDate);

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourString = hours > 0 ? `${hours} hour${hours !== 1 ? "s" : ""}` : "";
  const minuteString =
    remainingMinutes > 0
      ? `${remainingMinutes} min${remainingMinutes !== 1 ? "s" : ""}`
      : "";

  return `${hourString} ${minuteString}`.trim();
}

export function dateToCalendarDateTime(
  date: Date,
  timeZone: string = "Asia/Kolkata",
): CalendarDateTime {
  const utcZoned = fromDate(date, "UTC");
  const zoned = toTimeZone(utcZoned, timeZone);

  return new CalendarDateTime(
    zoned.calendar,
    zoned.era,
    zoned.year,
    zoned.month,
    zoned.day,
    zoned.hour,
    zoned.minute,
    zoned.second,
    zoned.millisecond,
  );
}

export const formatZonedDate = (
  date: Date | string,
  zone = getLocalTimeZone(),
) => {
  let rawDate = date;

  if (typeof rawDate === "string") {
    rawDate = new Date(rawDate);
  }
  const calendarDateTime = fromDate(rawDate, zone);

  return calendarDateTime.toDate().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: zone,
  });
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

function toDateFunc(input: Date | CalendarDateTime | ZonedDateTime): Date {
  if (input instanceof Date) return input;

  return input.toDate("UTC");
}

export const multiplyData = (data: any, times = 10) => {
  // Duplicate them 10 times with unique IDs
  const dummyData = [];
  let idCounter = 1;

  for (let i = 0; i < times; i++) {
    for (const p of data) {
      dummyData.push({
        ...p,
        id: p.id * 100 * times + idCounter, // make unique by offset + counter
        createdAt: new Date(p.createdAt.getTime() + i * 100 * times), // shift time a bit
        updatedAt: new Date(p.updatedAt.getTime() + i * 100 * times),
      });
      idCounter++;
    }
  }

  return dummyData;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
