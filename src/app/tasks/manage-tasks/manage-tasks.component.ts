import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../tasks.service';
import { Task } from 'src/app/projects/models/task.model';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'], // refer to your actual CSS file here
})
export class ManageTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }
  onAddTask() {
    this.router.navigate(['/add-task', 'task']);
  }

  onViewDetails(taskId: string) {
    this.router.navigate(['/view-task', 'task', taskId]);
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks();
    });
  }

  onEditTask(taskId: string) {
    this.router.navigate(['/edit-task', 'task', taskId]);
  }
}
