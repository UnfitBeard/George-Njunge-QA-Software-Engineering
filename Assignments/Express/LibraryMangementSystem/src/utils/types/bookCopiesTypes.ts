import { User } from "./userTypes";

export interface BookInventory {
    copy_id: number;
    book_id: number;
    inventory_number: string;
    condition: 'new' | 'good' | 'fair' | 'poor';
    status: 'borrowed' | 'returned';
    location: string;
};

export interface BookTypeRequest extends BookInventory {
    user?: User;
}