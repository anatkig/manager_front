import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CommonComponentsModule } from '../common-components/common.module';

@NgModule({
  declarations: [ManageTasksComponent],
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
    CommonComponentsModule,
  ],
})
export class TasksModule {}
