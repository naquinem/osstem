import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get user() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    localStorage.clear();
    location.href = '/';
  }

}
