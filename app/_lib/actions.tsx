"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, updateBooking } from "./data-service";
import { TablesUpdate } from "@/database.types";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;

  if (!/^\d{14}$/.test(nationalID))
    throw new Error("Please provide a valid national id");

  const nationalityValue = formData.get("nationality") as string;
  const [nationality, countryFlag] = nationalityValue.split("%");

  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: {
    startDate: string | undefined;
    endDate: string | undefined;
    numNights: number;
    cabinPrice: number;
    cabinId: number;
  },
  formDate: FormData,
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const observations = formDate.get("observations");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formDate.get("numGuests")),
    observations:
      typeof observations === "string" ? observations.slice(0, 1000) : null,
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thankyou");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(bookingId: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(+bookingId))
    throw new Error("You are not allowed to update this booking");

  const numGuests = formData.get("numGuests") as string;

  const observations = formData.get("observations") as string;

  const updatedFields: TablesUpdate<"bookings"> = {
    numGuests: +numGuests,
    observations: observations,
  };

  await updateBooking(+bookingId, updatedFields);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect(`/account/reservations`);
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
