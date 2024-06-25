import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusEmployeeDialogComponent } from './change-status-employee.dialog.component';

describe('DeadcivateEmployeeDialogComponent', () => {
  let component: ChangeStatusEmployeeDialogComponent;
  let fixture: ComponentFixture<ChangeStatusEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusEmployeeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStatusEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
