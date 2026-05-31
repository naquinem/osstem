import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 parts: any = [];

  constructor(private partsService: ComponentsService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts() {
    this.partsService.getAll().subscribe(res => {
      this.parts = res;
    });
  }
  loading = false;

  logout() {
    this.loading = true;

    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
