import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import{CompaniesComponent} from 'app/companies/Companies.component';
import { EmployeesComponent } from 'app/employees/Employees.component';
import { BranchesComponent } from 'app/branches/Branches.component';
import {ShiftsComponent} from 'app/shifts/Shifts.component';
import {FiscalYearsComponent} from 'app/fiscalyears/FiscalYearss.component';


import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { DepartmentsComponent } from './departments/Departments.component';
import { DesignationsComponent } from './designations/Designations.component';
import { EmployeeProfileComponent } from './employees/employee-profile/profile.component';
import { CreateEmployeeComponent } from './employees/employee-profile/create-employee.component';
import { EmployeeProfileDetailComponent } from './employees/employee-profile/employee-profile-detail/profiledetail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'employees', component: EmployeesComponent, data: { permission: 'Pages.Employees' }, canActivate: [AppRouteGuard] },
                    { path: 'employees/create', component: CreateEmployeeComponent, data: { permission: 'Pages.Employees' }, canActivate: [AppRouteGuard] },
                    { path: 'employees/profile', component: EmployeeProfileComponent, data: { permission: 'Pages.Employees' }, canActivate: [AppRouteGuard] },
                    { path: 'employees/profiledetail', component: EmployeeProfileDetailComponent, data: { permission: 'Pages.Employees' }, canActivate: [AppRouteGuard] },
                    { path: 'companies', component: CompaniesComponent, data: { permission: 'Pages.Companies' }, canActivate: [AppRouteGuard] },
                    { path: 'departments', component: DepartmentsComponent, data: { permission: 'Pages.Departments' }, canActivate: [AppRouteGuard] },
                    { path: 'shifts', component: ShiftsComponent, data: { permission: 'Pages.Shifts' }, canActivate: [AppRouteGuard] },
                    { path: 'designations', component: DesignationsComponent, data: { permission: 'Pages.Designations' }, canActivate: [AppRouteGuard] },
                    { path: 'fiscalyears', component: FiscalYearsComponent, data: { permission: 'Pages.FiscalYears' }, canActivate: [AppRouteGuard] },
                    { path: 'branches', component: BranchesComponent, data: { permission: 'Pages.Branches' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent }
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
