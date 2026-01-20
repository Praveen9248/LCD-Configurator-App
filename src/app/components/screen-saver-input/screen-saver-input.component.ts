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
export class ScreenSaverInputComponent implements OnInit {
  @Input() stepConfig: any;
  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    screenSaverStatus: this.fb.control<boolean>(false, {
      nonNullable: true,
      validators: Validators.required,
    }),
    screenSaverType: [''],
    imageUrl: [''],
    imageUrls: [[]],
    videoUrl: [''],
    videoLoop: [true],
    timeout: [30],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.screenSaver;
    if (saved) {
      this.form.patchValue(saved);
    }

    this.form
      .get('screenSaverStatus')!
      .valueChanges.subscribe((v) => this.applyStatusRules(v));

    this.form
      .get('screenSaverType')!
      .valueChanges.subscribe((v: any) => this.applyTypeRules(v));

    this.applyStatusRules(this.form.get('screenSaverStatus')!.value);
    this.applyTypeRules(this.form.get('screenSaverType')!.value);

    this.form.valueChanges.subscribe((val) => {
      this.layoutContextService.update({ screenSaver: val });
    });
  }

  applyStatusRules(enabled: boolean) {
    if (!enabled) {
      this.form.get('screenSaverType')!.reset();
      this.form.get('screenSaverType')!.disable();

      this.clearAllTypeFields();
    } else {
      this.form.get('screenSaverType')!.enable();
      this.form.get('screenSaverType')!.setValidators(Validators.required);
    }

    this.form.get('screenSaverType')!.updateValueAndValidity();
  }

  applyTypeRules(type: 'singleImage' | 'multiImage' | 'video') {
    this.clearAllTypeFields();
    this.clearTypeValidators();

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
    ['imageUrl', 'imageUrls', 'videoUrl', 'videoLoop'].forEach((f) =>
      this.form.get(f)!.reset()
    );
  }

  clearTypeValidators() {
    ['imageUrl', 'imageUrls', 'videoUrl'].forEach((f) => {
      const c = this.form.get(f)!;
      c.clearValidators();
      c.disable();
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
}
