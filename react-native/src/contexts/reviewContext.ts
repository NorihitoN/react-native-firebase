import { createContext } from "react";
import { Review } from "../types/review";

type ReviewsContextValue = {
    reviews: Review[];
    setReviews: (reviews: Review[]) => void;
};

export const ReviewContext = createContext<ReviewsContextValue>({
  reviews: [],
  setReviews: () => {},
});