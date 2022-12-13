export class ProductCategoryEntity {
  _id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  mainImage: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
