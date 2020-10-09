import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';

// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// company
import { CompaniesComponent } from 'app/companies/Companies.component';
import { CreateCompanyDialogComponent } from 'app/companies/create-company/create-company-dialog.component';
import { EditCompanyDialogComponent } from 'app/companies/edit-company/edit-company-dialog.component';
// Employee
import { EmployeesComponent } from 'app/employees/Employees.component';
import {EmployeeProfileDetailComponent } from 'app/employees/employee-profile/employee-profile-detail/profiledetail.component';
// import { CreateEmployeeDialogComponent } from 'app/employees/create-employee/create-employee-dialog.component';
// import { EditEmployeeDialogComponent } from '@app/employees/edit-employee/edit-employee-dialog.component';
import { EmployeeProfileComponent } from 'app/employees/employee-profile/profile.component';
import { CreateWorkExperienceComponent } from '@app/employees/employee-profile/work-experience/create-work-experience-dialog.component';
import { CreateEducationComponent } from '@app/employees/employee-profile/education/create-education-dialog.component';
import { CreateDependentComponent } from '@app/employees/employee-profile/dependent/create-dependent-dialog.component';
import { CreateEmployeeComponent } from '@app/employees/employee-profile/create-employee.component';

//Department
import { DepartmentsComponent } from 'app/departments/Departments.component';
import { CreateDepartmentDialogComponent } from 'app/departments/create-department/create-department-dialog.component';
import { EditDepartmentDialogComponent } from 'app/departments/edit-department/edit-department-dialog.component';
//Designation
import { DesignationsComponent } from 'app/designations/Designations.component';
import { CreateDesignationDialogComponent } from 'app/designations/create-designation/create-designation-dialog.component';
import { EditDesignationDialogComponent } from 'app/designations/edit-designation/edit-designation-dialog.component';
//Branch
import { BranchesComponent } from 'app/branches/Branches.component';
import { CreateBranchDialogComponent } from 'app/branches/create-branch/create-branch-dialog.component';
import { EditBranchDialogComponent } from 'app/branches/edit-branch/edit-branch-dialog.component';
//Shift
import { ShiftsComponent } from 'app/shifts/Shifts.component';
import { CreateShiftDialogComponent } from 'app/shifts/create-shift/create-shift-dialog.component';
import { EditShiftDialogComponent } from 'app/shifts/edit-shift/edit-shift-dialog.component';
//Shift
import { FiscalYearsComponent } from 'app/fiscalyears/FiscalYearss.component';
import { CreateFiscalYearDialogComponent } from 'app/fiscalyears/create-fiscalyear/create-fiscalyear-dialog.component';
import { EditFiscalYearDialogComponent } from 'app/fiscalyears/edit-fiscalyear/edit-fiscalyear-dialog.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // Company
    CompaniesComponent,
    CreateCompanyDialogComponent,
    EditCompanyDialogComponent,
    //Employee
    EmployeesComponent,
    EmployeeProfileDetailComponent,
    // CreateEmployeeDialogComponent,
    // EditEmployeeDialogComponent,
    EmployeeProfileComponent,
    CreateWorkExperienceComponent,
    CreateEducationComponent,
    CreateDependentComponent,
    CreateEmployeeComponent,
    //Department
    DepartmentsComponent,
    CreateDepartmentDialogComponent,
    EditDepartmentDialogComponent,
    //Designations
    DesignationsComponent,
    CreateDesignationDialogComponent,
    EditDesignationDialogComponent,
    //Branches
    BranchesComponent,
    CreateBranchDialogComponent,
    EditBranchDialogComponent,
    //Shift
    ShiftsComponent,
    CreateShiftDialogComponent,
    EditShiftDialogComponent,
    //FiscalYear
    FiscalYearsComponent,
    CreateFiscalYearDialogComponent,
    EditFiscalYearDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    TableModule,
    SortableModule,
    InputSwitchModule,
    FileUploadModule,
    TabViewModule,
    PanelModule
  ],
  providers: [],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    //company
    CreateCompanyDialogComponent,
    EditCompanyDialogComponent,
    //Employee
    // CreateEmployeeDialogComponent,
    // EditEmployeeDialogComponent,
    CreateWorkExperienceComponent,
    CreateEducationComponent,
    CreateDependentComponent,
    //Department
    CreateDepartmentDialogComponent,
    EditDepartmentDialogComponent,
    //Designations
    CreateDesignationDialogComponent,
    EditDesignationDialogComponent,
    //Branches
    CreateBranchDialogComponent,
    EditBranchDialogComponent,
    //Shift
    CreateShiftDialogComponent,
    EditShiftDialogComponent,
    //fiscalyear
    CreateFiscalYearDialogComponent,
    EditFiscalYearDialogComponent,
  ],
})
export class AppModule { }
