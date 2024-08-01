import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useLoginModal } from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const favorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (favorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [listingId, currentUser, favorited, loginModal, router]
  );

  return { favorited, toggleFavorite };
};
