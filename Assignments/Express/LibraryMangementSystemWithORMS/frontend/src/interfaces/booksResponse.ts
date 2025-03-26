
export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publication_year: number;
    pages: number;
    image_url: string;
    description: string;
    quantity: number;
    createdBy?: number; // Optional since it's nullable
    created_at: Date;
    location:string;
}
