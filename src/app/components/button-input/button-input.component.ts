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
export class ButtonInputComponent implements OnInit {
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

    this.form.valueChanges.subscribe((val) => {
      this.layoutContextService.update({ button: val });
    });
  }

  applyButtonRules(type: any) {
    this.clearTextFields();
    this.clearImageFields();

    if (type === 'text-only') {
      this.enableText();
      this.form.get('backgroundColor')!.enable();
    }

    if (type === 'image-only') {
      this.enableImage();
      this.form.get('backgroundColor')!.setValue('transparent');
      this.form.get('backgroundColor')!.disable();
    }

    if (type === 'textImage') {
      this.enableText();
      this.enableImage();
      this.form.get('backgroundColor')!.enable();
    }
  }

  enableText() {
    this.setRequired(['textHorizontalPos', 'textVerticalPos', 'textColor']);
  }

  enableImage() {
    this.setRequired(['imageUrl']);
  }

  clearTextFields() {
    this.clearValidators(['textHorizontalPos', 'textVerticalPos', 'textColor']);
  }

  clearImageFields() {
    this.clearValidators(['imageUrl']);
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
      c.setValue(null);
      c.updateValueAndValidity();
    });
  }
}
