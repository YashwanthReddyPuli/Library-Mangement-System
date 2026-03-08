export interface BaseEntity {
  id: number;
}

export interface Book extends BaseEntity {
  title: string;
  author: string;
  genre: string;
  year: number;
  isAvailable: boolean;
  price?: number;
  finePerDay?: number;
}


export interface Member extends BaseEntity {
  name: string;
  email: string;
  joinDate: Date;
  isActive: boolean;
}

export interface Transaction extends BaseEntity {
  bookId: number;
  memberId: number;
  borrowDate: Date;
  returnDate?: Date;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class Person {
  constructor(
    public id: number,
    public name: string,
    protected email: string
  ) {}

  getEmail(): string {
    return this.email;
  }
}