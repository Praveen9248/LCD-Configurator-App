import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-button-input',
  standalone: true,
  imports: [
    IonInput,
    CommonModule,
    ReactiveFormsModule,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    IonSelectOption,
    IonSelect,
  ],
  templateUrl: './button-input.component.html',
  styleUrls: ['./button-input.component.scss'],
})
export class ButtonInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    buttonType: ['text-only', Validators.required],

    width: [120, Validators.required],
    height: [48, Validators.required],
    borderRadius: [8],
    borderWidth: [1],
    borderColor: ['#000000'],

    backgroundColor: ['#1976d2'],

    textHorizontalPos: ['center'],
    textVerticalPos: ['center'],
    textColor: ['#ffffff'],

    imageUrl: [''],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.button;
    if (saved) {
      this.form.patchValue(saved);
    }

    this.form.get('buttonType')!.valueChanges.subscribe((type) => {
      this.applyButtonRules(type);
    });

    this.applyButtonRules(this.form.get('buttonType')!.value);
  }

  applyButtonRules(type: any) {
    this.clearTextFields();
    this.clearImageFields();

    if (type === 'text-only') {
      this.enableText();
      this.form.get('backgroundColor')!.enable({ emitEvent: false });
    } else if (type === 'image-only') {
      this.enableImage();
      this.form.get('backgroundColor')!.disable({ emitEvent: false });
    } else if (type === 'textImage') {
      this.enableText();
      this.enableImage();
      this.form.get('backgroundColor')!.enable({ emitEvent: false });
    }
  }

  enableText() {
    ['textHorizontalPos', 'textVerticalPos', 'textColor'].forEach((f) => {
      const c = this.form.get(f)!;
      c.enable({ emitEvent: false });
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    });
  }

  enableImage() {
    const imageControl = this.form.get('imageUrl')!;
    imageControl.enable({ emitEvent: false });
    imageControl.setValidators(Validators.required);
    imageControl.updateValueAndValidity();
  }

  clearTextFields() {
    ['textHorizontalPos', 'textVerticalPos', 'textColor'].forEach((f) => {
      const c = this.form.get(f)!;
      c.disable({ emitEvent: false });
      c.clearValidators();
      c.updateValueAndValidity();
    });
  }

  clearImageFields() {
    const imageControl = this.form.get('imageUrl')!;
    imageControl.disable({ emitEvent: false });
    imageControl.clearValidators();
    imageControl.updateValueAndValidity();
  }

  setRequired(fields: string[]) {
    fields.forEach((f) => {
      const c = this.form.get(f)!;
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    });
  }

  clearValidators(fields: string[]) {
    fields.forEach((f) => {
      const c = this.form.get(f)!;
      c.clearValidators();
      c.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log(this.form);
    this.layoutContextService.update({
      button: this.form.value,
    });
  }
}
