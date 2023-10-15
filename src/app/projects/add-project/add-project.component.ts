import { ProjectService } from './../projects.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProject: Project = {
      name: value.projectName,
      id: uuidv4(),
      description: value.description,
    };

    this.projectService.addProject(newProject).subscribe(
      (response) => {
        this.toastr.success('Your project has been added successfully!');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }

  onCancel() {
    // Navigate back to projects page without making any changes
    this.router.navigate(['/']);
  }
}
