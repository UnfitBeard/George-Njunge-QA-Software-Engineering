import { UserRequest } from "./userTypes";

/**
 * Event type defining structure of an event record in PostgreSQL
 */
interface Book {
  id: number;         // Primary Key
  title: string;      // Title of the book
  author: string;     // Author of the book
  genre: string;
  publishedYear: number; // Year of publication
  pages: number;
  price: number;
  publisher: string;     // Book genre/category
  created_by: number;  // Foreign Key referencing the user who added the book
  created_at?: Date;
  updated_at?: Date;
}


/**
 * Custom Express Request Type for event-related middleware
 * This extends `UserRequest` so that `req.user` is available
 */
export interface BookRequest extends UserRequest {
  params: {
    id: string; // Ensures `req.params.id` always exists
  };
  book?: Book;
}
