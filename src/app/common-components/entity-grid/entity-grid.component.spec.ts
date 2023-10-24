import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { EntityGridComponent } from './entity-grid.component';
import { TaskService } from 'src/app/tasks/tasks.service';
import { ProjectService } from 'src/app/projects/projects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EntityGridComponent', () => {
  let component: EntityGridComponent;
  let fixture: ComponentFixture<EntityGridComponent>;

  let mockTaskService = jasmine.createSpyObj('TaskService', [
    'getTasks',
    'deleteTask',
  ]);
  let mockProjectService = jasmine.createSpyObj('ProjectService', [
    'getProjects',
    'deleteProject',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: ProjectService, useValue: mockProjectService },
      ],
      declarations: [EntityGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(EntityGridComponent);
    component = fixture.componentInstance;

    component.entities = [];
    component.entityType = 'task';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
