import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ManageTasksComponent, TaskFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [TaskFormComponent],
})
export class TasksModule {}
