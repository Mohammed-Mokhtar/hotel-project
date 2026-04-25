"use client";
import { useOptimistic } from "react";
import { getBookings } from "../_lib/data-service";
import ReservationCard from "./ReservationCard";

import { deleteReservation } from "../_lib/actions";

type Bookings = Awaited<ReturnType<typeof getBookings>>;

export default function ReservationList({ bookings }: { bookings: Bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId: number) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
