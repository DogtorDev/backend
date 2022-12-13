export class StoreCategoryEntity {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isSubCategory?: boolean;
  parentCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
