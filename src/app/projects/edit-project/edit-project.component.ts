import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../projects.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  public projectName: string = '';
  public description: string = '';
  public id: string = '';
  tasks: Task[] = []; // Initialize with your tasks data

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

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
    // Navigate back to projects page without making any changes
    this.router.navigate(['/']);
  }

  onAddTask() {
    // Handle task creation
  }

  onAddEditTask(task: any) {
    // Handle task editing
    // If task is null, it means it's a new task
  }

  onDeleteTask(taskId: string) {
    // Handle task deletion
  }
}
