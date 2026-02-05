import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import { ImageUploadService } from 'src/app/services/data/image-upload-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';
import { addIcons } from 'ionicons';
import { checkmarkCircle, imageOutline, text } from 'ionicons/icons';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements handleStepForm {

  constructor(private layoutContextService: LayoutContextService, private imageUploadService: ImageUploadService, private fb: FormBuilder) {
    addIcons({ text, imageOutline, checkmarkCircle });
    effect(() => {
      if (!this.buttonType()) {
        this.clearForm();
        return;
      }

      if (!this.initialized) {
        this.buildForm();
        this.restoreImages();
        this.initialized = true;
      }
    });
  }

  flowType = computed(() => this.layoutContextService.value().template?.flowType)

  buttonType = computed(() => this.layoutContextService.value().button?.buttonType !== 'text-only')

  steps = computed(() => this.imageUploadService.getSteps(this.flowType()))

  form = this.fb.group({});

  private initialized = false;

  buildForm() {
    this.clearForm();

    this.steps().forEach((_, stepIdx) => {
      const stepGroup = this.fb.group({});
      const values = this.imageUploadService.getOptionsForStep(stepIdx, this.flowType());

      values.forEach(val => {
        stepGroup.addControl(
          val,
          this.fb.group({
            type: ['image'],
            mime: [''],
            encoding: ['base64'],
            data: ['', Validators.required],
          })
        );
      });

      this.form.addControl(stepIdx.toString(), stepGroup);
    });
  }

  clearForm() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.removeControl(key);
    })
  }

  restoreImages() {
    const saved = this.layoutContextService.value().images;
    if (!saved) return;

    Object.keys(saved).forEach(stepIdx => {
      const stepGroup = this.form.get(stepIdx) as FormGroup;
      if (!stepGroup) return;

      Object.keys(saved[stepIdx]).forEach(val => {
        if (stepGroup.get(val)) {
          stepGroup.get(val)?.patchValue(saved[stepIdx][val]);
        }
      });
    });
  }

  stepValues(stepIdx: number): string[] {
    return this.imageUploadService.getOptionsForStep(stepIdx, this.flowType());
  }

  onUpload(event: any, stepIdx: number, value: string) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    let stepGroup = this.form.get(stepIdx.toString()) as FormGroup;
    if (!stepGroup) {
      stepGroup = this.fb.group({});
      this.form.addControl(stepIdx.toString(), stepGroup);
    }

    let imgGroup = stepGroup.get(value);
    if (!imgGroup) {
      imgGroup = this.fb.group({
        type: ['image'],
        mime: [''],
        encoding: ['base64'],
        data: [''],
      });
      (stepGroup as FormGroup).addControl(value, imgGroup);
    }

    const reader = new FileReader();
    reader.onload = () => {
      imgGroup!.patchValue({
        mime: file.type,
        data: reader.result as string,
      });

      this.persistImages();
    };

    reader.readAsDataURL(file);
  }

  isUploaded(stepIdx: number, value: string): boolean {
    const ctrl = this.form.get(stepIdx.toString())?.get(value)?.get('data');
    return !!ctrl?.value;
  }

  persistImages() {
    this.layoutContextService.update({
      images: this.form.getRawValue(),
    });
  }

  onSubmit(): void {
    this.persistImages();
  }
}
