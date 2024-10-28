import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { PipeComponent } from './components/pipe/pipe.component';
import { GetAPIComponent } from './components/apiIntegration/get-api/get-api.component';
import { PostAPIComponent } from './components/apiIntegration/post-api/post-api.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './service/auth.guard';
 
export const routes: Routes = [
    //defualt route
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
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'add-emp',
                component: AddEmployeeComponent
            },

            {
                path:'data-binding',
                component:LoginComponent,
                canActivate: [authGuard]
            },
            {
                path:'emp-list',
                component: EmployeeListComponent
            },           
            {
                path: 'pipe',
                component: PipeComponent
            },
            {
                path: 'get-api',
                component: GetAPIComponent
            },
            {
                path: 'post-api',
                component: PostAPIComponent
            },
           
        
        ]
    }
   
];
