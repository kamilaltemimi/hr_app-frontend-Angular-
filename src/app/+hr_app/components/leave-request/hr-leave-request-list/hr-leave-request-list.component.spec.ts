import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLeaveRequestListComponent } from './hr-leave-request-list.component';

describe('HrLeaveRequestListComponent', () => {
  let component: HrLeaveRequestListComponent;
  let fixture: ComponentFixture<HrLeaveRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrLeaveRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrLeaveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
