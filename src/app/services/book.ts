import { Injectable } from '@angular/core';
import { Book } from '../library.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: 1, title: 'GTA V Lore', author: 'Rockstar', genre: 'Gaming', year: 2013, isAvailable: true },
    { id: 2, title: 'Angular Basics', author: 'Google', genre: 'Technical', year: 2024, isAvailable: true },
    { id: 3, title: 'Data Science', author: 'Yashwanth', genre: 'Education', year: 2025, isAvailable: false },
    { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, isAvailable: true },
    { id: 5, title: 'Clean Code', author: 'Robert Martin', genre: 'Technical', year: 2008, isAvailable: true },
    { id: 6, title: 'Cyberpunk 2077', author: 'CD Projekt', genre: 'Gaming', year: 2020, isAvailable: true },
    { id: 7, title: 'Python Mastery', author: 'Guido Rossum', genre: 'Technical', year: 1991, isAvailable: false },
    { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', year: 1988, isAvailable: true },
    { id: 9, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018, isAvailable: true },
    { id: 10, title: 'Deep Learning', author: 'Ian Goodfellow', genre: 'AI', year: 2016, isAvailable: true }
  ];

  getBooks() { return this.books; }

  addBook(newBook: Book) {
    this.books.push(newBook);
  }

  borrowBook(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book) book.isAvailable = false;
  }

  returnBook(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book) book.isAvailable = true;
  }
}