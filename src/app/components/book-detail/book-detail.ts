import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BookService } from '../../services/book';
import { Book } from '../../library.model';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatProgressSpinnerModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getBook(id).subscribe(data => {
        this.book = data;
        this.cdr.markForCheck();
      });
    }
  }

  goBack() {
    this.location.back();
  }
}