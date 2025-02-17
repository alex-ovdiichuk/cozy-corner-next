"use client";

import { useFavorite } from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { favorited, toggleFavorite } = useFavorite({ listingId, currentUser });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${favorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};
