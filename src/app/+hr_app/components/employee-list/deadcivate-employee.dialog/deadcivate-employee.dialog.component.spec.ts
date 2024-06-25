import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadcivateEmployeeDialogComponent } from './deadcivate-employee.dialog.component';

describe('DeadcivateEmployeeDialogComponent', () => {
  let component: DeadcivateEmployeeDialogComponent;
  let fixture: ComponentFixture<DeadcivateEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeadcivateEmployeeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadcivateEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
