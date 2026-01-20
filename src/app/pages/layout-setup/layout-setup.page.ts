import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFooter, IonButton } from '@ionic/angular/standalone';
import { SETUP_SCHEMA } from 'src/app/schema/setup-schema';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';

@Component({
  selector: 'app-layout-setup',
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonContent, CommonModule, FormsModule],
})
export class LayoutSetupPage {
  @ViewChild('stepHost', { read: ViewContainerRef, static: true })
  host!: ViewContainerRef;

  stepIndex = 0;
  schema = SETUP_SCHEMA;

  constructor(private ctx: LayoutContextService) {}

  ngOnInit() {
    this.renderStep();
  }

  renderStep() {
    this.host.clear();
    const step = this.schema[this.stepIndex];
    const ref = this.host.createComponent<any>(step.component);
    ref.instance.stepConfig = step;
  }

  next() {
    if (this.stepIndex < this.schema.length - 1) {
      this.stepIndex++;
      this.renderStep();
    }
  }

  prev() {
    if (this.stepIndex === 0) {
      return;
    }
    this.stepIndex--;
    this.renderStep();
  }
}
