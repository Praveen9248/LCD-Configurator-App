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
  IonItemDivider,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-button-input',
  standalone: true,
  imports: [
    IonInput,
    CommonModule,
    IonItemDivider,
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
  ) { }

  form = this.fb.group({
    buttonType: ['text-only', Validators.required],

    width: [400, [Validators.required, Validators.min(300)]],
    height: [300, [Validators.required, Validators.min(200)]],
    borderRadius: [50],
    borderWidth: [15, [Validators.min(10)]],
    borderColor: ['#ff0000'],

    backgroundColor: ['#1976d2'],

    textHorizontalPos: ['center'],
    textVerticalPos: ['center'],
    textColor: ['#ffffff'],

    fontSize: [48, [Validators.required, Validators.min(8)]],
    fontWeight: [800, Validators.required],
    lineHeight: [1.1, [Validators.required, Validators.min(0.8)]],
    letterSpacing: [-0.5],
    fontFamily: ['Inter'],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().button;
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


    if (type === 'text-only') {
      this.enableText();
      this.form.get('backgroundColor')!.enable({ emitEvent: false });
    } else if (type === 'image-only') {
      this.form.get('backgroundColor')!.disable({ emitEvent: false });
    } else if (type === 'textImage') {
      this.enableText();

      this.form.get('backgroundColor')!.enable({ emitEvent: false });
    }
  }

  enableText() {
    ['textHorizontalPos', 'textVerticalPos', 'textColor',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'fontFamily',].forEach((f) => {
        const c = this.form.get(f)!;
        c.enable({ emitEvent: false });
        c.setValidators(Validators.required);
        c.updateValueAndValidity();
      });
  }

  clearTextFields() {
    ['textHorizontalPos', 'textVerticalPos', 'textColor',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'fontFamily',].forEach((f) => {
        const c = this.form.get(f)!;
        c.disable({ emitEvent: false });
        c.clearValidators();
        c.updateValueAndValidity();
      });
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
    this.layoutContextService.update({
      button: this.form.value,
    });
  }
}
