import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../projects.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss'],
})
export class ManageProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}
  ngOnInit() {
    this.fetchProjects();
  }
  fetchProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  onAddProject() {
    this.router.navigate(['/add-project', 'project']);
  }
  onEditProject(projectId: string) {
    this.router.navigate(['/edit-project', 'project', projectId]);
  }
  onDeleteProject(projectId: string) {
    this.projectService
      .deleteProject(projectId)
      .subscribe(() => this.fetchProjects());
  }
  onViewDetails(projectId: string) {
    this.router.navigate(['/view-project', 'project', projectId]);
  }
}
