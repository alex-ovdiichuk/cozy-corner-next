import { prismadb } from "@/libs/prismadb";
import { Listing, Reservation } from "@prisma/client";

export const getReservations = async ({
  listingId,
  userId,
  authorId,
}: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}) => {
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prismadb.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations as (Reservation & { listing: Listing })[];
  } catch (error: any) {
    throw new Error(error);
  }
};
