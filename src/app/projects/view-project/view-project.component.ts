import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../projects.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss'],
})
export class ViewProjectComponent implements OnInit {
  public projectName: string = '';
  public description: string = '';
  public tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService // Inject your service
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId) {
      this.projectService.getProject(projectId).subscribe(
        (project) => {
          this.projectName = project.name;
          this.description = project.description;
        },
        (error) => {
          // Handle the error appropriately.
          console.error('An error occurred fetching the project data', error);
        }
      );
    }
  }
}
