"use client";
import { Tables } from "@/database.types";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! }),
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: Tables<"settings">;
  bookedDates: Date[];
  cabin: Tables<"cabins">;
}) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const { regularPrice, discount } = cabin;

  const from = displayRange?.from;
  const to = displayRange?.to;

  const numNights = from && to ? differenceInDays(to, from) : 0;

  const cabinPrice = numNights * (regularPrice! - (discount ?? 0));

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength!}
        max={maxBookingLength!}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="label"
        classNames={{
          range_start: "bg-accent-500 text-primary-800 rounded-l-full",
          range_middle: "bg-accent-500 text-primary-800",
          range_end: "bg-accent-500 text-primary-800 rounded-r-full",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {(discount ?? 0 > 0) ? (
              <>
                <span className="text-2xl">
                  ${regularPrice! - (discount ?? 0)}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;

