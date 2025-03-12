type Book =  {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string,
    image: string,
    price: number;
    quantity?:number;
}

type Books = Book[]
export {Books, Book}