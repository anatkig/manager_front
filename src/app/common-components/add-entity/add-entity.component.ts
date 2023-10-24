import { ProjectService } from '../../projects/projects.service';
import { TaskService } from 'src/app/tasks/tasks.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../projects/models/project.model';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/projects/models/task.model';
import { Complexity } from 'src/app/shared/complexity.enum';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss'],
})
export class AddEntityComponent implements OnInit {
  public disableSubmit: boolean = false;
  private usedNames: string[] = [];
  public typeView: string = '';
  public projectId: string = '';
  public projectName: string = '';
  public entityName: string = '';
  public entityComplexity: string = '';
  public entityCode: string = '';
  public entityDescription: string = '';
  public projects: Project[] = [];
  public tasks: Task[] = [];
  public selectedProject: string = '';
  public Complexity = Complexity;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    const projectName = this.route.snapshot.paramMap.get('projectName');

    const type = this.route.snapshot.paramMap.get('type');
    this.typeView = type === 'project' ? 'Project' : 'Task';

    if (projectId) this.projectId = projectId;
    if (projectName) this.projectName = projectName;

    if (type === 'task') this.fetchProjects();
  }
  fetchProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  fetchTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addNewProject(form: NgForm) {
    const value = form.value;
    const newProject: Project = {
      name: value.entityName,
      id: uuidv4(),
      description: value.description,
      complexity: value.entityComplexity,
      code: value.entityCode,
    };

    this.disableSubmit = true;

    if (!this.usedNames.includes(value.projectName)) {
      this.projectService.addProject(newProject).subscribe(
        (response) => {
          this.toastr.success('Your project has been added successfully!');
          this.router.navigate(['/']);
          this.disableSubmit = false;
          this.fetchProjects();
        },
        (error) => {
          this.toastr.error(error.message);
          this.disableSubmit = false;
        }
      );
    } else {
      this.toastr.warning(
        'You have already created this Project. If you want to change it, use "edit" button'
      );
    }
    this.usedNames.push(value.projectName);
  }

  addNewTask(form: NgForm) {
    const value = form.value;
    const newTask: Task = {
      name: value.entityName,
      id: uuidv4(),
      description: value.description,
      projectId: value.projectId,
    };

    this.disableSubmit = true;

    if (!this.usedNames.includes(value.taskName)) {
      this.taskService.addTask(newTask).subscribe(
        (response) => {
          this.toastr.success('Your task has been added successfully!');

          this.router.navigate(['/manage-tasks']);
          this.disableSubmit = false;
          this.fetchTasks();
        },
        (error) => {
          this.toastr.error(error.message);
          this.disableSubmit = false;
        }
      );
    } else {
      this.toastr.warning(
        'You have already created a task with this name. If you want to change it, use the "edit" button.'
      );
    }
    this.usedNames.push(value.taskName);
  }

  onSubmit(form: NgForm) {
    if (this.typeView === 'Project') {
      this.addNewProject(form);
    } else {
      this.addNewTask(form);
    }
    this.router.navigate(['/']);
  }

  onCancel() {
    // Navigate back to projects page without making any changes
    this.router.navigate(['/']);
  }
}
