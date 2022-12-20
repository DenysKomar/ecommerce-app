import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Smith",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim shirt",
      slug: "Nike-Slim-shirt",
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
      slug: "Nike-Slim-pants",
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
      slug: "puma-Slim-shirt",
      category: "shirts",
      image: "/images/p3.jpg",
      price: 120,
      countInStock: 10,
      brand: "puma",
      rating: 3,
      numReviews: 10,
      description: "high quality",
    },
    {
      name: "addidas Slim shirt",
      slug: "addidas-Slim-shirt",
      category: "shirts",
      image: "/images/p4.jpg",
      price: 120,
      countInStock: 0,
      brand: "addidas",
      rating: 2,
      numReviews: 10,
      description: "high quality",
    },
  ],
};

export default data;
