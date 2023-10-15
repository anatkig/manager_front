import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ManageProjectsComponent } from './projects/manage-projects/manage-projects.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';

const routes: Routes = [
  { path: '', component: ManageProjectsComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'view-project/:id', component: ViewProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
