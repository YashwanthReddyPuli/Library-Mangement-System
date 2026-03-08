import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { Book, Transaction } from '../library.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';
  private transactionsUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  borrowBook(bookId: number, memberId: number, book: Book): Observable<any> {
    const updatedBook = { ...book, isAvailable: false };
    
    // First update the book to not available, then create a new transaction record
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, updatedBook).pipe(
      switchMap(() => {
        const transaction: Partial<Transaction> = {
          bookId,
          memberId,
          borrowDate: new Date(),
          status: 'borrowed'
        };
        return this.http.post<Transaction>(this.transactionsUrl, transaction);
      })
    );
  }

  returnBook(bookId: number, book: Book): Observable<any> {
    const updatedBook = { ...book, isAvailable: true };
    
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, updatedBook).pipe(
      switchMap(() => {
        // Optional: Could fetch open transaction and PUT 'returned', but POSTing a new closed event is safer without direct ID reference.
        const transaction: Partial<Transaction> = {
          bookId,
          memberId: 0, // Unassigned or derived if logged in
          borrowDate: new Date(),
          returnDate: new Date(),
          status: 'returned'
        };
        return this.http.post<Transaction>(this.transactionsUrl, transaction);
      })
    );
  }
}