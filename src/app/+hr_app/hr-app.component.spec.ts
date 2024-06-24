import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAppComponent } from './hr-app.component';

describe('HrAppComponent', () => {
  let component: HrAppComponent;
  let fixture: ComponentFixture<HrAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
