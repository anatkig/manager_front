import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

export interface TaskDialogData {
  projectId: string; // assuming projectId is a string
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  public projectId: string = '';
  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  // This method is called when the user clicks outside the dialog or presses the escape key
  onNoClick(): void {
    this.dialogRef.close();
  }

  // This method is called when the user submits the form
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form data', form.value);
      // Here, you might dispatch an action to add the task or call a service method directly
      // You can also pass form data back to the dialog's caller if needed
      this.dialogRef.close(form.value);
    }
  }
}
