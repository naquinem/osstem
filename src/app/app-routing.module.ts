import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentComponent } from './pages/component/component.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { UserComponentShowComponent } from './pages/user-component/user-component.component';
import { UserGuard } from './guards/user.guard';


const routes: Routes = [

  { path: '', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard]
  },

  {
    path: 'component',
    component: ComponentComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'components',
    component: UserComponentShowComponent
  },

  {
    path: 'components/:id',
    component: UserComponentShowComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
