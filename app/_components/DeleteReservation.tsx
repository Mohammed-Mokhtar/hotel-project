"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";

function DeleteReservation({ bookingId }: { bookingId: number }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => deleteReservation(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:cursor-not-allowed disabled:bg-gray-500"
    >
      <TrashIcon
        className={`h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors ${isPending ? "animate-pulse" : ""}`}
      />
      <span className="mt-1">{isPending ? "Deleting..." : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;
