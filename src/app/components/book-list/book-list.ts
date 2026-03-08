import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BookService } from '../../services/book';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../library.model';
import { HighlightOverdue } from '../../directives/highlight-overdue';
import { BookFilterPipe } from '../../pipes/book-filter-pipe';
import { AuthorFilterPipe } from '../../pipes/author-filter.pipe';
import { GenreFilterPipe } from '../../pipes/genre-filter.pipe';
import { StatusFilterPipe } from '../../pipes/status-filter.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HighlightOverdue, UpperCasePipe, RouterModule, BookFilterPipe,
    AuthorFilterPipe, GenreFilterPipe, StatusFilterPipe,
    MatTableModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule
  ], 
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = ''; 
  authorTerm: string = '';
  genreTerm: string = '';
  statusTerm: string = 'all';

  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'status', 'action'];

  constructor(
    private bookService: BookService,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cdr.markForCheck();
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.notification.error("Please fill out all required fields.");
      return;
    }

    const { title, author, genre, year } = form.value;
    
    this.bookService.addBook({
      id: this.books.length + 1,
      title,
      author,
      genre: genre || 'General',
      year: year || new Date().getFullYear(),
      isAvailable: true,
      price: 0
    }).subscribe(() => {
      this.notification.success(`Book "${title}" recorded in the archives.`);
      form.resetForm();
      this.loadBooks();
    });
  }
}