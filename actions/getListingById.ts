import { prismadb } from "@/libs/prismadb";
import { Listing, User } from "@prisma/client";

interface IParams {
  listingId?: string;
}

export const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;

    const listing = await prismadb.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing as Listing & { user: User };
  } catch (error) {
    return null;
  }
};
