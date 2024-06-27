import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailsDialogComponent } from './projects-details.dialog.component';

describe('ProjectsDetailsDialogComponent', () => {
  let component: ProjectsDetailsDialogComponent;
  let fixture: ComponentFixture<ProjectsDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
