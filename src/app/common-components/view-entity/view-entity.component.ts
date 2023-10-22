import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../projects/projects.service';
import { TaskService } from 'src/app/tasks/tasks.service';
import { Task } from 'src/app/projects/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.scss'],
})
export class ViewEntityComponent implements OnInit {
  public entityName: string = '';
  public description: string = '';
  public typeView: string = '';
  public tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    this.typeView = type === 'project' ? 'Project' : 'Task';

    if (id && type) {
      this.fetchEntity(id, type);
    }
    if (type === 'project' && id) this.fetchTasks(id);
  }

  fetchEntity(id: string, type: string) {
    if (type === 'project') {
      this.projectService.getProject(id).subscribe(
        (entity) => {
          this.entityName = entity.name;
          this.description = entity.description;
        },
        (error) => {
          console.error('An error occurred fetching the project data', error);
        }
      );
    } else {
      this.taskService.getTask(id).subscribe(
        (task) => {
          this.entityName = task.name;
          this.description = task.description;
        },
        (error) => {
          console.error('An error occurred fetching the project data', error);
        }
      );
    }
  }
  fetchTasks(projectId: string) {
    this.taskService
      .getTasksByProjectId(projectId)
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }
  onSelectTask(taskId: string) {
    this.router.navigate(['/view-task', 'task', taskId]);
  }
}
