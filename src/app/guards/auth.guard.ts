import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Project 6 Requirement: Route guards to secure member-only features
    const hasAccess = this.authService.isLoggedIn(); 

    if (!hasAccess) {
      alert("Access Denied: You must be an active member to perform this action.");
      this.router.navigate(['/books']);
      return false;
    }
    return true;
  }
}
