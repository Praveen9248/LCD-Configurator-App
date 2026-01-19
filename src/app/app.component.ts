import { Component, effect } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppService } from './services/app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(appService: AppService, router: Router) {
    effect(() => {
      if (!appService.isLogged()) {
        router.navigate(['server-selection']);
        return;
      }
    });
  }
}
