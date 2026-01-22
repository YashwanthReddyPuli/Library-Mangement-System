import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { Book } from '../../library.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks(); // Fetches all 6+ books from the service
  }
  addNew(title: string, author: string) {
  if (!title || !author) return;
  const newBook: Book = {
    id: this.books.length + 1,
    title,
    author,
    genre: 'Unassigned',
    year: 2026,
    isAvailable: true
  };
  this.bookService.addBook(newBook);
}

}