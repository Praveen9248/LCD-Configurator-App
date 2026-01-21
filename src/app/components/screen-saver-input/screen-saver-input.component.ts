import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonItem,
  IonList,
  IonListHeader,
  IonText,
  IonToggle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
} from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-screen-saver-input',
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonToggle,
    IonText,
    IonListHeader,
    IonList,
    IonItem,
    CommonModule,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './screen-saver-input.component.html',
  styleUrls: ['./screen-saver-input.component.scss'],
})
export class ScreenSaverInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;
  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    screenSaverStatus: this.fb.control<boolean>(false, {
      nonNullable: true,
    }),
    screenSaverType: [{ value: null, disabled: true }],
    imageUrl: [{ value: null, disabled: true }],
    imageUrls: [{ value: [], disabled: true }],
    videoUrl: [{ value: null, disabled: true }],
    videoLoop: [{ value: true, disabled: true }],
    timeout: [{ value: 30, disabled: true }],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.screenSaver;
    if (saved) {
      Promise.resolve().then(() => {
        this.form.patchValue(saved);
      });
    }

    this.form
      .get('screenSaverStatus')!
      .valueChanges.subscribe((v) => this.applyStatusRules(v));

    this.form
      .get('screenSaverType')!
      .valueChanges.subscribe((v) => this.applyTypeRules(v));

    this.applyStatusRules(this.form.get('screenSaverStatus')!.value);
    this.applyTypeRules(this.form.get('screenSaverType')!.value);
  }

  applyStatusRules(enabled: boolean) {
    if (!enabled) {
      this.form.get('screenSaverType')!.reset();
      this.form.get('screenSaverType')!.disable();

      this.clearAllTypeFields();
    } else {
      const type = this.form.get('screenSaverType')!;
      type.enable();
      type.setValidators(Validators.required);
    }

    this.form.get('screenSaverType')!.updateValueAndValidity();
  }

  applyTypeRules(type: 'singleImage' | 'multiImage' | 'video' | null) {
    this.clearAllTypeFields();
    this.clearTypeValidators();

    if (!type) return;

    switch (type) {
      case 'singleImage':
        this.enableSingleImage();
        break;

      case 'multiImage':
        this.enableMultiImage();
        break;

      case 'video':
        this.enableVideo();
        break;
    }
  }

  clearAllTypeFields() {
    ['imageUrl', 'imageUrls', 'videoUrl', 'videoLoop'].forEach((f) => {
      const c = this.form.get(f)!;
      c.reset();
      c.disable();
    });
  }

  clearTypeValidators() {
    ['imageUrl', 'imageUrls', 'videoUrl'].forEach((f) => {
      const c = this.form.get(f)!;
      c.clearValidators();
      c.updateValueAndValidity();
    });
  }

  enableSingleImage() {
    const c = this.form.get('imageUrl')!;
    c.enable();
    c.setValidators(Validators.required);
    c.updateValueAndValidity();
  }
  enableMultiImage() {
    const c = this.form.get('imageUrls')!;
    c.enable();
    c.setValidators(Validators.required);
    c.updateValueAndValidity();
  }
  enableVideo() {
    const c = this.form.get('videoUrl')!;
    c.enable();
    c.setValidators(Validators.required);
    c.updateValueAndValidity();
    this.form.get('videoLoop')!.enable();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      screenSaver: this.form.getRawValue(),
    });
  }
}
