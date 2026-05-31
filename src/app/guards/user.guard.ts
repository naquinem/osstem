import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user?.role?.trim().toLowerCase() === 'user') {
      return true;
    }

    this.router.navigate(['/component']);
    return false;
  }
}
