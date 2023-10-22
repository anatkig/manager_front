import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntityComponent } from './common-components/add-entity/add-entity.component';
import { ManageProjectsComponent } from './projects/manage-projects/manage-projects.component';
import { EditEntityComponent } from './common-components/edit-entity/edit-entity.component';
import { ViewEntityComponent } from './common-components/view-entity/view-entity.component';
import { ManageTasksComponent } from './tasks/manage-tasks/manage-tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-projects',
    pathMatch: 'full',
  },
  {
    path: 'manage-projects',
    component: ManageProjectsComponent,
  },
  { path: 'manage-tasks', component: ManageTasksComponent },
  { path: 'add-project/:type', component: AddEntityComponent },
  {
    path: 'add-task/:type/:projectId/:projectName',
    component: AddEntityComponent,
  },
  {
    path: 'add-task/:type',
    component: AddEntityComponent,
  },
  { path: 'edit-project/:type/:id', component: EditEntityComponent },
  { path: 'edit-task/:type/:id', component: EditEntityComponent },
  { path: 'view-project/:type/:id', component: ViewEntityComponent },
  { path: 'view-task/:type/:id', component: ViewEntityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
