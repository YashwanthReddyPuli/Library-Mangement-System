import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Optionally add headers or handle loading states here
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown archival error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.notification.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        // Handle loading indicator cleanup if needed
      })
    );
  }
}
