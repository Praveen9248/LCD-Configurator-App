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
  IonItemDivider,
} from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

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
    IonItemDivider,
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
  ) { }

  form = this.fb.group({
    contentType: ['C0001', Validators.required],
    backgroundStyle: this.fb.control<'color' | 'image' | 'gradient'>('color', {
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

    backgroundGradient: this.fb.group({
      type: ['linear'],
      angle: [90, Validators.required],
      startColor: ['#ffffff', Validators.required],
      endColor: ['#000000', Validators.required],
    }),
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().content;
    if (saved) {

      this.form.patchValue(saved, { emitEvent: false });

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

  applyBackgroundRules(style: 'color' | 'image' | 'gradient') {
    this.clearValidators();

    if (style === 'color') {
      this.form.get('backgroundColor')!.enable();
      this.form.get('backgroundColor')!.setValidators(Validators.required);
    }

    if (style === 'image') {
      this.form.get('backgroundImage')!.enable();
      this.form.get('backgroundImage')!.setValidators(Validators.required);
    }

    if (style === 'gradient') {
      this.form.get('backgroundGradient')!.enable();
    }

    ['backgroundColor', 'backgroundImage', 'backgroundGradient'].forEach((f) =>
      this.form.get(f)!.updateValueAndValidity()
    );
  }

  clearValidators() {
    ['backgroundColor', 'backgroundImage', 'backgroundGradient'].forEach((f) => {
      const c = this.form.get(f)!;
      c.clearValidators();
      c.disable({ emitEvent: false });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      content: this.form.value,
    });
  }
}
