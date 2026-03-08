import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-return-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],

  template: `
    <div class="royal-dialog">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon style="vertical-align: middle; margin-right: 8px;">history</mat-icon>
        Restore to Archives?
      </h2>
      <mat-dialog-content class="dialog-content">
        <p>Restoring <strong>{{ data.bookTitle }}</strong> back to the Royal Archives will make it available for future seekers. Confirm this restoration?</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button (click)="onNoClick()" class="cancel-button">Stay Borrowed</button>
        <button mat-raised-button [mat-dialog-close]="true" class="confirm-button" cdkFocusInitial>Complete Restoration</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .royal-dialog {
      background: var(--royal-parchment);
      padding: 10px;
      border: 3px double var(--royal-gold);
    }
    .dialog-title {
      font-family: 'Cinzel', serif !important;
      color: var(--royal-burgundy);
      border-bottom: 2px solid var(--royal-gold);
      padding-bottom: 10px;
    }
    .dialog-content {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      color: var(--royal-wood);
      margin: 20px 0;
    }
    .cancel-button {
      font-family: 'Cinzel', serif;
      color: var(--royal-wood-light);
    }
    .confirm-button {
      background: var(--royal-burgundy) !important;
      color: var(--royal-gold) !important;
      font-family: 'Cinzel', serif;
      border: 1px solid var(--royal-gold);
    }
  `]
})

export class ReturnConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ReturnConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { bookTitle: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
