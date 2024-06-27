import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChangeStatusDialogComponent } from './employee-change-status.dialog.component';

describe('DeadcivateEmployeeDialogComponent', () => {
  let component: EmployeeChangeStatusDialogComponent;
  let fixture: ComponentFixture<EmployeeChangeStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeChangeStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeChangeStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
