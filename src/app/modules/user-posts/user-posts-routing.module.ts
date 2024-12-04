import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
  },
  {
    path: ':id',
    component: ViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPostsRoutingModule {}
