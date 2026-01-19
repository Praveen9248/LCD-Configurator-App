import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isLogged = signal<boolean>(true);

  loginUser() {
    this.isLogged.set(true);
  }

  logoutUser() {
    this.isLogged.set(false);
  }
}
