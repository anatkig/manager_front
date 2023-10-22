import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import your Task service
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'], // refer to your actual CSS file here
})
export class ManageTasksComponent implements OnInit {
  tasks: any[] = [];

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
    // Navigate to task details page
    this.router.navigate(['/view-task', 'task', taskId]);
  }

  onDeleteTask(taskId: string) {
    // Call the task service to delete the task.
    // After deletion, you may want to fetch the task list again to refresh the list.
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks(); // re-fetch the list of tasks
    });
  }

  onEditTask(taskId: string) {
    // Navigate to edit task page
    this.router.navigate(['/edit-task', 'task', taskId]);
  }
}
