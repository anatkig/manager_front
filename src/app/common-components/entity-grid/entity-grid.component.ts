import { ProjectService } from './../../projects/projects.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/tasks/tasks.service';
import { Task } from 'src/app/projects/models/task.model';
import { Project } from 'src/app/projects/models/project.model';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entity-grid',
  templateUrl: './entity-grid.component.html',
  styleUrls: ['./entity-grid.component.scss'],
})
export class EntityGridComponent implements AfterViewInit {
  @Input() entityType: string = '';
  @Input() entities: (Task | Project)[] = [];

  public numberOfTiles = 4; // default number of tiles
  @ViewChild('gridContainer') gridContainer!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculateNumberOfTiles();
  }

  constructor(
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    if (this.gridContainer && this.gridContainer.nativeElement) {
      this.calculateNumberOfTiles();
    } else {
      console.error('Grid container is not accessible');
    }
    this.cdr.detectChanges();
  }
  onEditEntity(entityId: string, type: string) {
    const route = type === 'project' ? '/edit-project' : '/edit-task';
    this.router.navigate([route, type, entityId]);
  }

  onDeleteEntity(entityId: string, type: string) {
    if (type === 'project') {
      this.projectService.deleteProject(entityId).subscribe({
        next: () => {
          this.fetchEntities(type);
          this.toastr.success('Your project has been deleted successfully!');
        },
        error: (error) => {
          this.toastr.error('There was an error deleting the project.');
          console.error(error);
        },
      });
    } else {
      this.taskService.deleteTask(entityId).subscribe({
        next: () => {
          this.fetchEntities(type);
          this.toastr.success('Your task has been deleted successfully!');
        },
        error: (error) => {
          this.toastr.error('There was an error deleting the task.');
          console.error(error);
        },
      });
    }
  }

  onViewDetails(entityId: string, type: string) {
    const route = type === 'project' ? '/view-project' : '/view-task';
    this.router.navigate([route, type, entityId]);
  }

  fetchEntities(type: string) {
    if (type === 'project') {
      this.projectService.getProjects().subscribe((projects) => {
        this.entities = projects;
      });
    } else {
      this.taskService.getTasks().subscribe((tasks) => {
        this.entities = tasks;
      });
    }
  }

  calculateNumberOfTiles() {
    const width = this.gridContainer.nativeElement.clientWidth;
    if (width > 1200) {
      this.numberOfTiles = 4;
    } else if (width > 900) {
      this.numberOfTiles = 3;
    } else if (width > 600) {
      this.numberOfTiles = 2;
    } else {
      this.numberOfTiles = 1;
    }
  }
}
