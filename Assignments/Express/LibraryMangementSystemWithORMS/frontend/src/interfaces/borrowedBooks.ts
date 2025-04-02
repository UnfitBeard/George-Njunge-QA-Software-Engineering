export interface BorrowedBook {
    id: number;                     // Unique identifier for the borrowed record
    borrowed_at: Date;              // Date when the book was borrowed
    due_date: Date;                 // Due date for the borrowed book to be returned
    copy: {
        copy_id: number;            // Unique identifier for the specific copy of the book
        inventory_number: string;   // Inventory number for the copy
        status: string;             // Status of the copy (e.g., "Borrowed")
        condition: string;          // Condition of the book (e.g., "New")
        location: string;           // Location of the book copy
    };
    book: {
        id: number;                 // Unique identifier for the book
        title: string;              // Title of the book
        author: string;             // Author of the book
        genre: string;              // Genre of the book
        publisher: string;          // Publisher of the book
        publication_year: number;  // Year the book was published
        pages: number;              // Number of pages in the book
        image_url: string;          // URL to an image of the book cover
        description: string;        // A short description of the book
        quantity: number;           // The total available copies of the book
        created_at: Date;           // Timestamp when the book was created/added to the library
    };
    user: {
        id: number;                 // Unique identifier for the user who borrowed the book
        username: string;           // Username of the borrower
        email: string;              // Email of the user
        password: string;           // Encrypted password of the user (not typically used in frontend)
        role_id: number;            // Role ID of the user (indicates the user's role, e.g., admin, member)
        created_at: Date;           // Timestamp when the user was created
    };
}
