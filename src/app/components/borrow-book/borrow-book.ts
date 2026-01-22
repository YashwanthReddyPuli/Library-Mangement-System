import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { Book } from '../../library.model';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-book.html'
})
export class BorrowBookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks(); // Load initial 10+ books
  }

  borrow(id: number) {
    this.bookService.borrowBook(id); // Update status in service
    this.books = this.bookService.getBooks(); // Refresh local list to update UI
    alert('Book borrowed successfully!');
  }
}