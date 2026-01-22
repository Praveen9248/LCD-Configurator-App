import {
  Component,
  ComponentRef,
  computed,
  effect,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFooter, IonButton } from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import { LayoutCodeMap } from 'src/app/mappings/layoutCodeMap';

@Component({
  selector: 'app-layout-setup',
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonContent, CommonModule, FormsModule],
})
export class LayoutSetupPage {
  layoutContextService = inject(LayoutContextService);

  currentStepIndex = computed(() => this.layoutContextService.currentStepIdx());

  @ViewChild('stepHost', { read: ViewContainerRef, static: true })
  vSetup!: ViewContainerRef;

  vSetupRef?: ComponentRef<any>;

  private viewReady = false;

  constructor() {
    effect(() => {
      this.layoutContextService.currentStepIdx();
      if (!this.viewReady) {
        return;
      }
      this.loadComponent();
    });
  }

  ngAfterViewInit() {
    this.viewReady = true;
    this.loadComponent();
  }

  loadComponent() {
    if (!this.vSetup) return;
    const stepCode = this.layoutContextService.steps[this.currentStepIndex()];
    const component = LayoutCodeMap[stepCode];
    if (!component) return;

    this.vSetup.clear();
    this.vSetupRef = this.vSetup.createComponent(component);

    this.vSetupRef.instance.stepConfig = stepCode;
  }

  next() {
    const instance = this.vSetupRef?.instance as handleStepForm;
    if (!instance.form) {
      return;
    }

    if (instance?.form?.invalid) {
      instance?.form?.markAllAsTouched();
      return;
    }

    instance?.onSubmit();

    if (this.currentStepIndex() < this.layoutContextService.steps.length - 1) {
      this.layoutContextService.currentStepIdx.update((i) => i + 1);
    }
  }

  prev() {
    if (this.currentStepIndex() === 0) {
      return;
    }
    this.layoutContextService.currentStepIdx.update((i) => i - 1);
  }
}
