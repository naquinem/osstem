import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentComponent } from './pages/component/component.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { UserComponentShowComponent } from './pages/user-component/user-component.component';
import { UserGuard } from './guards/user.guard';
import { RequestHistoryComponent } from './pages/request-history/request-history.component';
import { AdminWithdrawalsComponent } from './pages/admin-withdrawals/admin-withdrawals.component';
import { WithdrawalHistoryComponent } from './pages/withdrawal-history/withdrawal-history.component';

const routes: Routes = [

  {
    path: '',
    component:
    LoginComponent
  },
  {
    path:'history',
    component:RequestHistoryComponent,
    canActivate:[UserGuard]
  },
  {
    path:'withdrawals',
    component:AdminWithdrawalsComponent,
    canActivate:[AdminGuard]
  },
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
    component: RegisterComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'components',
    component: UserComponentShowComponent
  },

  {
    path: 'components/:id',
    component: UserComponentShowComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'withdrawal-history',
    component: WithdrawalHistoryComponent,
    canActivate: [AdminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
