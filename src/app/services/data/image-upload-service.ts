import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private httpClient: HttpClient) {
    this.getApiData().subscribe((data: any) => {
      this.apiData.set(data);
    });
  }

  apiData = signal<any>(null);

  getApiData() {
    return this.httpClient.get<any>('assets/api/data.json');
  }

  categorySteps = ['category1', 'category2', 'category3', 'category4'];
  etcSteps = ['etc0', 'etc1', 'etc2', 'etc3'];

  getSteps(mode: string) {
    return mode === 'CATEGORY' ? this.categorySteps : this.etcSteps;
  }

  getOptionsForStep(stepIdx: number, mode: string): any[] {
    const steps = this.getSteps(mode);
    const key = steps[stepIdx];

    return [
      ...new Set(
        this.apiData()
          ?.labelList
          .map((item: any) => item[key])
          .filter((v: any) => v && v.trim() !== '')
      ),
    ];
  }
}
