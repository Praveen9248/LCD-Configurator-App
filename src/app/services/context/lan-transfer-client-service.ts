import { Injectable, signal } from '@angular/core';
import {
  ErrorEvent,
  LanTransfer,
  ProgressEvent,
  StatusEvent,
} from 'capacitor-lan-transfer';


@Injectable({ providedIn: 'root' })
export class LanTransferClientService {
  connectionStatus = signal<boolean>(false);
  logs = signal<any[]>([]);
  senderProgressPercent = signal<number>(0);
  private initialized = false;
  sendFileStatus = signal<boolean>(false);

  private statusListener?: { remove: () => Promise<void> };
  private progressListener?: { remove: () => Promise<void> };
  private errorListener?: { remove: () => Promise<void> };

  async initOnce() {
    if (this.initialized) return;
    await this.registerListeners();
    this.initialized = true;
  }

  async registerListeners() {
    this.statusListener = await LanTransfer.addListener(
      'status',
      (e: StatusEvent) => {
        if (e.role !== 'client') return;

        switch (e.status) {
          case 'client_connected':
            this.addToLogs(e.status);
            this.connectionStatus.set(true);
            break;

          case 'client_disconnected':
            this.addToLogs(e.status);
            this.connectionStatus.set(false);
            break;

          case 'connection_closed':
            this.addToLogs(e.status);
            this.connectionStatus.set(false);
            break;

          case 'send_started':
            this.sendFileStatus.set(true)
            this.addToLogs(e.status);
            break;

          case 'send_complete':
            this.sendFileStatus.set(false)
            this.addToLogs(e.status);
            this.connectionStatus.set(false);
        }
      }
    );

    this.errorListener = await LanTransfer.addListener(
      'error',
      (e: ErrorEvent) => {
        if (e.role !== 'client') return;
        this.sendFileStatus.set(false)
        this.addToLogs(e.message);
      }
    );

    this.progressListener = await LanTransfer.addListener(
      'progress',
      (e: ProgressEvent) => {
        if (e.role !== 'client' || e.direction === 'receive') return;
        this.senderProgressPercent.set(e.percent);
      }
    );
  }

  addToLogs(message: any) {
    if (!message) return;

    this.logs.update((prev) => [...prev, message]);
  }

  async connect(host: string, port: number) {
    await this.initOnce();
    this.addToLogs(`Connecting to ${host}:${port}`);
    await LanTransfer.connect({ host, port });
  }

  async disconnect() {
    await LanTransfer.disconnect();
    this.connectionStatus.set(false);
  }

  async sendFile(path: string) {
    if (!this.connectionStatus()) {
      this.addToLogs('Not connected to server');
      return;
    }

    await LanTransfer.sendFile({ path });

  }

  async cleanup() {
    await this.statusListener?.remove();
    await this.progressListener?.remove();
    await this.errorListener?.remove();

    this.initialized = false;
    this.senderProgressPercent.set(0);
    this.connectionStatus.set(false);
  }
}
