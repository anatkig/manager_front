import { Complexity } from './../../shared/complexity.enum';
import { Task } from './../../projects/models/task.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../projects/models/project.model';
import { ProjectService } from '../../projects/projects.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/tasks/tasks.service';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
})
export class EditEntityComponent implements OnInit {
  public entityName: string = '';
  public description: string = '';
  public id: string = '';
  public entityComplexity: string = '';
  public entityCode: string = '';
  public Complexity = Complexity;
  public parentProjectId: string = '';
  public tasks: Task[] = [];
  public projects: Project[] = [];
  public selectedProject: string = '';
  public typeView: string = '';

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const entityId = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    this.typeView = type === 'project' ? 'Project' : 'Task';
    if (entityId) this.id = entityId;

    if (type === 'project' && entityId) this.fetchTasks(entityId);

    if (type === 'project' && entityId) {
      this.getProject(entityId);
    } else if (entityId) {
      this.getTask(entityId);
      this.fetchProjects();
    }
  }

  getProject(id: string) {
    if (id) {
      this.projectService.getProject(id).subscribe(
        (project) => {
          this.entityName = project.name;
          this.description = project.description;
          this.id = project.id;
          this.entityCode = project.code;
          this.entityComplexity = project.complexity;
        },
        (error) => {
          console.error('An error occurred fetching the project data', error);
        }
      );
    }
  }
  getTask(id: string) {
    if (id) {
      this.taskService.getTask(id).subscribe(
        (project) => {
          this.entityName = project.name;
          this.description = project.description;
          this.id = project.id;
          this.parentProjectId = project.projectId;
          this.selectedProject = project.projectId;
        },
        (error) => {
          console.error('An error occurred fetching the project data', error);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.typeView === 'Project') {
      this.editProject(form);
    } else {
      this.editTask(form);
    }
  }

  editProject(form: NgForm) {
    const value = form.value;
    const newProject: Project = {
      name: value.entityName,
      description: value.description,
      id: this.id,
      complexity: value.complexity,
      code: value.code,
    };
    this.projectService.editProject(newProject).subscribe(
      (response) => {
        this.toastr.success('Your project has been edited successfully!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    );
  }

  editTask(form: NgForm) {
    const value = form.value;
    const updatedTask: Task = {
      name: value.entityName,
      description: value.description,
      id: this.id,
      projectId: value.projectId,
    };
    this.taskService.editTask(updatedTask.id, updatedTask).subscribe(
      (response) => {
        this.toastr.success('Your task has been edited successfully!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onAddTask() {
    this.router.navigate(['/add-task', 'task', this.id, this.entityName]);
  }
  onViewDetails(taskId: string) {
    this.router.navigate(['/view-task', 'task', taskId]);
  }
  onEditTask(taskId: string) {
    this.router.navigate(['/edit-task', 'task', taskId]);
  }
  fetchTasks(projectId: string) {
    this.taskService
      .getTasksByProjectId(projectId)
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }
  fetchProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  onDeleteTask(taskId: string, projectId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks(projectId);
    });
  }
}
