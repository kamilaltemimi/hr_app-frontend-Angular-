import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAddDialogComponent } from './projects-add.dialog.component';

describe('ProjectsAddDialogComponent', () => {
  let component: ProjectsAddDialogComponent;
  let fixture: ComponentFixture<ProjectsAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
