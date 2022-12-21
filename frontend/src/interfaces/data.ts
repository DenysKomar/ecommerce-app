export interface IProductData {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
}
export interface IUserData {
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
  _id: string;
}
