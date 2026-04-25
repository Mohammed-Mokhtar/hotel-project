import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Tables } from "@/database.types";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({
  cabin,
}: {
  cabin: Tables<"cabins">;
}) {
  const [settings, bookedDates]: [Tables<"settings">, Date[]] =
    await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);

  const session = await auth();
  return (
    <div className="grid grid-cols-2 gap-x-1 border border-primary-800 min-h-100">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
