export interface ProductEntity {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images: string[];
  basePrice: number;
  variants: any[];
  dimentions: string;
  weight: string;
  isFeatured: boolean;
  isPublished: boolean;
  isPromo: boolean;
  categories: string[];
  reviews: string[];
  createdAt: Date;
  updatedAt: Date;
}
