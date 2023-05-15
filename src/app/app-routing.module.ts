import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // empty path route or login cmpnt
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addstudent',
    component: AddstudentComponent,
    canActivate: [AuthGuard]
  },

  { path: 'editstudent/:id', component: AddstudentComponent ,canActivate: [AuthGuard]},
  // 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
