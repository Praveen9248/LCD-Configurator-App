import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutSetupPage } from './layout-setup.page';

describe('LayoutSetupPage', () => {
  let component: LayoutSetupPage;
  let fixture: ComponentFixture<LayoutSetupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
