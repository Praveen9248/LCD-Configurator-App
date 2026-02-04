import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonItem,
  IonItemDivider,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonText,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-header-input',
  standalone: true,
  imports: [
    IonLabel,
    IonInput,
    IonText,
    IonListHeader,
    IonItem,
    IonItemDivider,
    IonList,
    IonSelect,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header-input.component.html',
  styleUrls: ['./header-input.component.scss'],
})
export class HeaderInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) { }

  form = this.fb.group({
    headerType: ['H0001', Validators.required],

    title: ['', Validators.required],
    caption: [''],

    logoUrl: [''],

    backgroundColor: ['#ffffff'],
    textColor: ['#000000'],
    textPosition: ['center'],

    textSize: [20],
    fontWeight: [400],
    lineHeight: [1.4],
    letterSpacing: [0],
    fontFamily: ['Inter'],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().header;
    if (saved) {
      Promise.resolve().then(() => {
        this.form.patchValue(saved);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.layoutContextService.update({
      header: this.form.getRawValue(),
    });
  }
}
