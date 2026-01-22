import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { BookService } from '../../services/book';
import { Book } from '../../library.model';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './borrow-book.html'
})
export class BorrowBookComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = ''; 

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks(); 
  }

  
  get filteredBooks() {
    return this.books.filter(b => 
      b.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  borrow(id: number) {
    this.bookService.borrowBook(id); 
    this.books = this.bookService.getBooks(); 
    alert('Book borrowed successfully!');
  }
}