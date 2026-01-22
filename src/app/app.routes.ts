import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookDetailComponent } from './components/book-detail/book-detail';
import { BorrowBookComponent } from './components/borrow-book/borrow-book';
import { ReturnBookComponent } from './components/return-book/return-book';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'borrow', component: BorrowBookComponent },
  { path: 'return', component: ReturnBookComponent }
];