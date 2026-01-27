import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LanTransfer } from 'capacitor-lan-transfer';
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
  IonIcon,
  IonLabel,
  IonFabButton,
  IonFab,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, desktop, server } from 'ionicons/icons';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonFab,
    IonFabButton,
    IonLabel,
    IonIcon,
    IonText,
    IonListHeader,
    IonItem,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    IonList,
  ],
})
export class DevicesPage {
  layoutContextService = inject(LayoutContextService);
  form = inject(FormBuilder);
  status = signal<any>(null);

  constructor() {
    addIcons({ desktop, add });
  }

  connectDeviceForm = this.form.group({
    host_ip: ['', Validators.required],
    port: ['', Validators.required],
  });

  addDevice() {
    const data = this.connectDeviceForm.value;
    this.connectDevice(data);
    console.log(data);
  }

  existingLCD = computed(() => this.layoutContextService.existingDevices());

  async connectDevice(data: any) {
    const res = await LanTransfer.initialize({
      role: 'client',
      host: data.host_ip,
      serverPort: data.port,
    });

    this.layoutContextService.existingDevices.update((pre) => [...pre, res]);

    await LanTransfer.addListener('status', (e) => {
      if (e.status === 'client_connected') {
        this.status.set(e.status);
      }
      if (e.status === 'connection_accepted') {
        this.status.set(e.status);
      }
    });
  }
}
