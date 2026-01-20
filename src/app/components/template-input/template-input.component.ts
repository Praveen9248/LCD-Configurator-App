import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonRadioGroup,
  IonRadio,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-input',
  standalone: true,
  imports: [
    IonRadio,
    IonRadioGroup,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss'],
})
export class TemplateInputComponent implements OnInit {
  @Input({ required: true }) stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    templateType: this.fb.control<'list' | 'nested'>('list', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.templateType;
    if (saved) {
      this.form.patchValue({ templateType: saved });
    }

    this.form.valueChanges.subscribe((val) => {
      this.layoutContextService.update({ templateType: val.templateType });
    });
  }

  isValid() {
    return this.form.valid;
  }

  getValue() {
    return this.form.value;
  }
}
