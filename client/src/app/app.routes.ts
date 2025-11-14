import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TaskComponent } from './pages/task/task.component';
import { authGuard } from './auth.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent, canActivate:[authGuard]
    },
    {
        path:'profile',
        component:ProfileComponent, canActivate:[authGuard]
    },
    {
        path:'task',
        component:TaskComponent, canActivate:[authGuard]
    },
    {
        path:'forgot-password',
        loadComponent: () => import('./pages/forgot/forgot.component')
        .then(m => m.ForgotComponent)
    },
    {
        path:'reset-password',
        component:ResetComponent
    }
];
