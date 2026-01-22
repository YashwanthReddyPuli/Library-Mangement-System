import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './return-book.html'
})
export class ReturnBookComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    
    this.books = this.bookService.getBooks().filter(b => !b.isAvailable);
  }

  returnBook(id: number) {
    this.bookService.returnBook(id); 
    this.updateList(); 
    alert('Book returned!');
  }
}