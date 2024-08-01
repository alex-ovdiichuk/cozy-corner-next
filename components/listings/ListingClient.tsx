"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "../navbar/Categories";
import { Container } from "../Container";
import { ListingHead } from "./ListingHead";
import { ListingInfo } from "./ListingInfo";

interface ListingClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
  reservations?: Reservation[];
}

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imgSrc={listing.imgSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
