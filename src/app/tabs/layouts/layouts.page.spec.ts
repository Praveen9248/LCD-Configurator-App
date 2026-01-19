import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutsPage } from './layouts.page';

describe('LayoutsPage', () => {
  let component: LayoutsPage;
  let fixture: ComponentFixture<LayoutsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
