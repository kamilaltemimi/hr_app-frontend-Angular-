import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHrLeaveRequestComponent } from './details-hr-leave-request.component';

describe('DetailsHrLeaveRequestComponent', () => {
  let component: DetailsHrLeaveRequestComponent;
  let fixture: ComponentFixture<DetailsHrLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHrLeaveRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsHrLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
