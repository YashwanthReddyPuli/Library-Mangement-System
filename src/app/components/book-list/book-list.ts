import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../library.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './book-list.html'
})
export class BookListComponent implements OnInit {
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

  addNew(title: string, author: string) {
    if (!title || !author) return;
    this.bookService.addBook({
      id: this.books.length + 1,
      title,
      author,
      genre: 'General',
      year: 2026,
      isAvailable: true
    });
    this.books = this.bookService.getBooks(); 
  }
}