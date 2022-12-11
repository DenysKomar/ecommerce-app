import React, { ReactNode, useEffect, useState } from "react";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";

interface IRating {
  rating: number;
  numReviews: number;
  className: ReactNode;
}

const Rating = ({ numReviews, rating, className }: IRating): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  const constractRating = (rating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span>
          {i < rating
            ? ((<BsStarFill />) as JSX.Element)
            : ((<BsStar />) as JSX.Element)}
        </span>
      );
    });
    setRatingArray(updatedArray);
  };
  useEffect(() => {
    constractRating(rating);
  }, []);

  return (
    <div className="rating">
      {ratingArray.map((r) => (
        <span key={Math.random()}>{r}</span>
      ))}
      <span>{numReviews} reviews</span>
    </div>
  );
};

export default Rating;
