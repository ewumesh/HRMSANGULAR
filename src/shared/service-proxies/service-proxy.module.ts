import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';
import { AppUrlService } from '@shared/nav/app-url.service';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.CompanyServiceProxy,
        ApiServiceProxies.EmployeeServiceProxy,
        ApiServiceProxies.DepartmentServiceProxy,
        ApiServiceProxies.DesignationServiceProxy,
        ApiServiceProxies.BranchServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.GenericListServiceProxy,
        ApiServiceProxies.ShiftServiceProxy,
        ApiServiceProxies.FiscalYearServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
