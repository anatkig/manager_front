import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';



@NgModule({
  declarations: [
    ManageTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
