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

const data = {
  products: [
    {
      name: "Nike Slim shirt",
      slug: "Nike Slim shirt",
      category: "shirts",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality",
    },
    {
      name: "Nike Slim pants",
      slug: "Nike Slim pants",
      category: "shirts",
      image: "/images/p2.jpg",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality",
    },
    {
      name: "puma Slim shirt",
      slug: "puma Slim shirt",
      category: "shirts",
      image: "/images/p3.jpg",
      price: 120,
      countInStock: 10,
      brand: "puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality",
    },
    {
      name: "addidas Slim shirt",
      slug: "addidas Slim shirt",
      category: "shirts",
      image: "/images/p4.jpg",
      price: 120,
      countInStock: 10,
      brand: "addidas",
      rating: 4.5,
      numReviews: 10,
      description: "high quality",
    },
  ],
};

export default data;
