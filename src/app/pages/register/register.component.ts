import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  message = '';
  alertClass = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {

    this.message = '';

    if (!this.name || !this.email || !this.password) {
      this.message = 'All fields are required';
      this.alertClass = 'alert-danger';
      return;
    }

    this.loading = true;

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res: any) => {

        this.message = 'User created successfully!';
        this.alertClass = 'alert-success';

        // clear form
        this.name = '';
        this.email = '';
        this.password = '';

        this.loading = false;
        this.router.navigate(['/dashboard']);
        // auto hide message
        setTimeout(() => this.message = '', 3000);
      },

      error: (err) => {
        this.message = err?.error?.message || 'Registration failed';
        this.alertClass = 'alert-danger';
        this.loading = false;
      }
    });
  }
}
