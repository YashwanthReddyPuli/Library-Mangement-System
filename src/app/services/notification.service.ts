import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['royal-snackbar', 'success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 7000,
      panelClass: ['royal-snackbar', 'error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  info(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['royal-snackbar', 'info-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
