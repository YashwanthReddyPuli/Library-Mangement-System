import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { BookService } from '../../services/book';
import { Book } from '../../library.model';
import { BookFilterPipe } from '../../pipes/book-filter-pipe';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, BookFilterPipe,
    MatTableModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule
  ], 
  templateUrl: './borrow-book.html',
  styleUrl: './borrow-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorrowBookComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = '';
  borrowForm: FormGroup;
  displayedColumns: string[] = ['title', 'author', 'action'];

  constructor(
    private bookService: BookService, 
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.borrowForm = this.fb.group({
      searchTerm: [''],
      memberId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit() {
    this.loadBooks();
    
    this.borrowForm.get('searchTerm')?.valueChanges.subscribe(term => {
      this.searchTerm = term || '';
    });
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cdr.markForCheck();
    });
  }

  borrow(book: Book) {
    if (this.borrowForm.invalid) {
      this.notification.error("Please enter a valid Member ID before borrowing.");
      return;
    }

    const memberId = Number(this.borrowForm.get('memberId')?.value);

    this.bookService.borrowBook(book.id, memberId, book).subscribe(() => {
      this.notification.success(`Tome "${book.title}" successfully requisitioned.`);
      this.loadBooks();
    });
  }
}