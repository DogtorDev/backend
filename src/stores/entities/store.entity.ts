export interface StoreEntity {
  _id: string;
  name: string;
  slug: string;
  description: string;
  ownerId: string;
  admins: string[];
  mainImage: string;
  images: string[];
  location: {};
  products: string[];
  categories: string[];
  reviews: string[];
  isFeatured: boolean;
  isBranch: boolean;
  parentStore: string;
  workingHours: [];
  isDisabled: boolean;
  isClosed: boolean;
}
