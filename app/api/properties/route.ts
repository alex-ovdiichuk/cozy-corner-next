import { getCurrentUser } from "@/actions/getCurrentUser";
import { prismadb } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imgSrc,
    price,
    title,
    description,
  } = body;

  const property = await prismadb.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imgSrc,
      price: parseInt(price),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(property);
};
