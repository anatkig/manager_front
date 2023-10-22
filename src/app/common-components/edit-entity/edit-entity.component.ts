import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../projects/models/task.model';
import { Router } from '@angular/router';
import { Project } from '../../projects/models/project.model';
import { ProjectService } from '../../projects/projects.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
})
export class EditEntityComponent implements OnInit {
  public projectName: string = '';
  public description: string = '';
  public id: string = '';
  tasks: Task[] = [];
  public typeView: string = '';

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    this.typeView = type === 'project' ? 'Project' : 'Task';

    if (projectId) {
      this.projectService.getProject(projectId).subscribe(
        (project) => {
          this.projectName = project.name;
          this.description = project.description;
          this.id = project.id;
        },
        (error) => {
          // Handle the error appropriately.
          console.error('An error occurred fetching the project data', error);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProject: Project = {
      name: value.projectName,
      description: value.description,
      id: this.id,
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

  onCancel() {
    this.router.navigate(['/']);
  }

  onAddTask() {
    this.router.navigate(['/add-task', 'task', this.id, this.projectName]);
  }

  onAddEditTask(task: any) {
    // Handle task editing
    // If task is null, it means it's a new task
  }

  onDeleteTask(taskId: string) {
    // Handle task deletion
  }
}
