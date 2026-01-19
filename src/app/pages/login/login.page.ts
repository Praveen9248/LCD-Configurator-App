import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage {
  constructor(private router: Router, private appService: AppService) {}

  onLogin() {
    this.appService.loginUser();
    this.router.navigate(['']);
  }

  onRegister() {
    this.router.navigate(['register']);
  }
}
