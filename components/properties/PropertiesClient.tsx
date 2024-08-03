"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser: User | null;
}

export const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((r) => (
          <ListingCard
            key={r.id}
            data={r}
            currentUser={currentUser}
            actionId={r.id}
            onAction={onCancel}
            disabled={deletingId === r.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};
