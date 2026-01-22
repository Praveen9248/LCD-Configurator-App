import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonListHeader,
  IonList,
  IonItem,
  IonText,
  IonSelectOption,
  IonSelect,
  IonInput,
} from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-content-input',
  standalone: true,
  imports: [
    IonInput,
    IonText,
    IonItem,
    IonList,
    IonListHeader,
    CommonModule,
    ReactiveFormsModule,
    IonSelectOption,
    IonSelect,
  ],
  templateUrl: './content-input.component.html',
  styleUrls: ['./content-input.component.scss'],
})
export class ContentInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;
  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    contentType: ['C0001', Validators.required],
    backgroundStyle: this.fb.control<'color' | 'image'>('color', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    backgroundColor: ['#ffffff'],
    backgroundImageUrl: [''],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.content;
    if (saved) {
      Promise.resolve().then(() => {
        this.form.patchValue(saved);
      });
    }

    this.form.get('backgroundStyle')!.valueChanges.subscribe((style) => {
      this.applyBackgroundRules(style);
    });

    this.applyBackgroundRules(this.form.get('backgroundStyle')!.value);
  }

  applyBackgroundRules(style: 'color' | 'image') {
    this.clearValidators();

    if (style === 'color') {
      this.form.get('backgroundImageUrl')!.reset();
      this.form.get('backgroundImageUrl')!.disable();

      this.form.get('backgroundColor')!.enable();
      this.form.get('backgroundColor')!.setValidators(Validators.required);
    }

    if (style === 'image') {
      this.form.get('backgroundColor')!.reset();
      this.form.get('backgroundColor')!.disable();

      this.form.get('backgroundImageUrl')!.enable();
      this.form.get('backgroundImageUrl')!.setValidators(Validators.required);
    }

    this.form.get('backgroundColor')!.updateValueAndValidity();
    this.form.get('backgroundImageUrl')!.updateValueAndValidity();
  }

  clearValidators() {
    ['backgroundColor', 'backgroundImageUrl'].forEach((f) => {
      const c = this.form.get(f)!;
      c.clearValidators();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      content: this.form.getRawValue(),
    });
  }
}
