import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, desktop, server } from 'ionicons/icons';
import { LanTransferClientService } from 'src/app/services/context/lan-transfer-client-service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCard,
    IonButton,
    IonInput,

    IonLabel,
    IonIcon,
    IonText,
    IonListHeader,
    IonItem,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    IonList,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class DevicesPage {
  lanTransferClientService = inject(LanTransferClientService);
  form = inject(FormBuilder);

  deviceStatus = computed(() =>
    this.lanTransferClientService.connectionStatus()
  );

  connectionLogs = computed(() => this.lanTransferClientService.logs());

  constructor() {
    addIcons({ desktop, add });
  }

  connectDeviceForm = this.form.group({
    host_ip: ['', Validators.required],
    port: ['', Validators.required],
  });

  async addDevice() {
    const { host_ip, port } = this.connectDeviceForm.value;

    if (!host_ip || !port) return;

    await this.lanTransferClientService.initOnce();
    await this.lanTransferClientService.connect(host_ip, +port);
  }

  async onDisconnect() {
    await this.lanTransferClientService.disconnect();
  }
}
