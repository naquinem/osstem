import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentComponent } from './pages/component/component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponentShowComponent } from './pages/user-component/user-component.component';
import { UserComponent } from './pages/user/user.component';
import { RequestHistoryComponent } from './pages/request-history/request-history.component';
import { AdminWithdrawalsComponent } from './pages/admin-withdrawals/admin-withdrawals.component';
import { WithdrawalHistoryComponent } from './pages/withdrawal-history/withdrawal-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ComponentComponent,
    RegisterComponent,
    UserComponentShowComponent,
    UserComponent,
    RequestHistoryComponent,
    AdminWithdrawalsComponent,
    WithdrawalHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
