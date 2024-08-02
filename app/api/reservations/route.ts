import { getCurrentUser } from "@/actions/getCurrentUser";
import { prismadb } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const { totalPrice, startDate, endDate, listingId } = body;

  if (!listingId || !totalPrice || !startDate || !endDate)
    return NextResponse.error();

  const listingAndReservation = await prismadb.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
};
