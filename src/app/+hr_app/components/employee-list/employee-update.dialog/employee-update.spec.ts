import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateeDialogComponent } from './employee-update.dialog.component';

describe('UpdateEmployeeDialogComponent', () => {
  let component: EmployeeUpdateeDialogComponent;
  let fixture: ComponentFixture<EmployeeUpdateeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUpdateeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUpdateeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
