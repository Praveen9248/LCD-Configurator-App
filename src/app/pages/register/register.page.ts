import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonItem,
    IonInput,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterPage {
  constructor(private router: Router, private appService: AppService) {}

  onRegister() {
    this.appService.loginUser();
    this.router.navigate(['']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}
