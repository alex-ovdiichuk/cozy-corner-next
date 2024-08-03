import { Listing, User } from "@prisma/client";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { ListingCard } from "../listings/ListingCard";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser: User | null;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((r) => (
          <ListingCard key={r.id} data={r} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};
