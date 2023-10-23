import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonComponentsModule } from '../common-components/common.module';

@NgModule({
  declarations: [ManageProjectsComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    CommonComponentsModule,
  ],
  exports: [ManageProjectsComponent],
})
export class ProjectsModule {}
