import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BookService } from '../../services/book';
import { Book } from '../../library.model';
import { ReturnConfirmDialog } from '../return-confirm-dialog/return-confirm-dialog';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './return-book.html',
  styleUrl: './return-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnBookComponent implements OnInit {
  dataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['id', 'title', 'author', 'action'];

  constructor(private bookService: BookService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.bookService.getBooks().subscribe(data => {
      const borrowedBooks = data.filter(b => !b.isAvailable);
      this.dataSource.data = borrowedBooks;
      this.cdr.markForCheck();
    });
  }

  returnBook(book: Book) {
    const dialogRef = this.dialog.open(ReturnConfirmDialog, {
      width: '450px',
      data: { bookTitle: book.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.returnBook(book.id, book).subscribe(() => {
          this.updateList(); 
        });
      }
    });
  }
}