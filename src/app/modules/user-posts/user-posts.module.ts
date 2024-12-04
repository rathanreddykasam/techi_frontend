import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPostsRoutingModule } from './user-posts-routing.module';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ViewComponent, CreateComponent],
  imports: [
    CommonModule,
    UserPostsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    _MatSlideToggleRequiredValidatorModule,
    QuillModule.forRoot(),
  ],
})
export class UserPostsModule {}
