import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewEntityComponent } from './view-entity/view-entity.component';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EntityGridComponent } from './entity-grid/entity-grid.component';

@NgModule({
  declarations: [
    ViewEntityComponent,
    AddEntityComponent,
    EditEntityComponent,
    EntityGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddEntityComponent,
    ViewEntityComponent,
    EditEntityComponent,
    EntityGridComponent,
  ],
})
export class CommonComponentsModule {}
