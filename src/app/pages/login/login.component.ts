import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  message = '';
  alertClass = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {

    this.message = '';

    if (!this.email || !this.password) {
      this.message = 'Please fill all fields';
      this.alertClass = 'alert-danger';
      return;
    }

    this.loading = true;

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({

      next: (res: any) => {

        this.auth.saveToken(res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.message = 'Login successful!';
        this.alertClass = 'alert-success';

        this.loading = false;

        setTimeout(() => {

          // redirect based on role
          if (res.user.role === 'admin') {
            this.router.navigate(['/component']);
          } else {
            this.router.navigate(['/dashboard']);
          }

        }, 800);
      },

      error: (err) => {
        this.message = err?.error?.message || 'Invalid login';
        this.alertClass = 'alert-danger';
        this.loading = false;
      }
    });
  }
}
