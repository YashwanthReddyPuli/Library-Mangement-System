import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookDetailComponent } from './components/book-detail/book-detail';
import { BorrowBookComponent } from './components/borrow-book/borrow-book';
import { ReturnBookComponent } from './components/return-book/return-book';
import { MembersComponent } from './components/members/members';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'borrow', component: BorrowBookComponent, canActivate: [AuthGuard] },
  { path: 'return', component: ReturnBookComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent }
];