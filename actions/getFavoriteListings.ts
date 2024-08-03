import { prismadb } from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prismadb.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
};
