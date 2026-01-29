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
  IonLabel,
} from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';
import { Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-content-input',
  standalone: true,
  imports: [
    IonLabel,
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
    backgroundImage: this.fb.group({
      type: ['image'],
      mime: [''],
      encoding: ['base64'],
      data: [''],
    }),
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().content;
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

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];

      this.form.patchValue({
        backgroundImage: {
          type: 'image',
          mime: file.type,
          encoding: 'base64',
          data: base64,
        },
      });
    };

    reader.readAsDataURL(file);
  }

  applyBackgroundRules(style: 'color' | 'image') {
    this.clearValidators();

    if (style === 'color') {
      this.form.get('backgroundImage')!.reset();
      this.form.get('backgroundImage')!.disable();

      this.form.get('backgroundColor')!.enable();
      this.form.get('backgroundColor')!.setValidators(Validators.required);
    }

    if (style === 'image') {
      this.form.get('backgroundColor')!.reset();
      this.form.get('backgroundColor')!.disable();

      this.form.get('backgroundImage')!.enable();
      this.form.get('backgroundImage')!.setValidators(Validators.required);
    }

    this.form.get('backgroundColor')!.updateValueAndValidity();
    this.form.get('backgroundImage')!.updateValueAndValidity();
  }

  clearValidators() {
    ['backgroundColor', 'backgroundImage'].forEach((f) => {
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
