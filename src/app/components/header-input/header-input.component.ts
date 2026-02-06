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
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, imageOutline } from 'ionicons/icons';

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
    IonButton,
    IonIcon,
  ],
  templateUrl: './header-input.component.html',
  styleUrls: ['./header-input.component.scss'],
})
export class HeaderInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {
    addIcons({
      'checkmark-circle': checkmarkCircleOutline,
      'image-outline': imageOutline,
    });
  }

  form = this.fb.group({
    headerType: ['H0001', Validators.required],

    title: ['', Validators.required],
    caption: [''],

    logoUrl: this.fb.group({
      mime: [''],
      encoding: ['base64'],
      data: [''],
    }),

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

  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];

      this.form.patchValue({
        logoUrl: {
          mime: file.type,
          encoding: 'base64',
          data: base64,
        },
      });
    };

    reader.readAsDataURL(file);
  }

  isLogoUploaded(): boolean {
    const logo = this.form.get('logoUrl')?.value;
    return !!logo?.data;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.layoutContextService.update({
      header: this.form.getRawValue(),
    });
  }
}
