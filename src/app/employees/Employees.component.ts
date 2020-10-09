import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  EmployeeServiceProxy,
  EmployeeDtosPagedResultDto,
  EmployeeDtos
} from '@shared/service-proxies/service-proxies';
import{EmployeeProfileComponent} from '../employees/employee-profile/profile.component';
// import { CreateEmployeeDialogComponent } from './create-employee/create-employee-dialog.component';
// import { EditEmployeeDialogComponent } from './edit-employee/edit-employee-dialog.component';
import * as moment from 'moment';
import { from } from 'rxjs';
import { initial } from 'lodash';
import { Router } from '@angular/router'

class PagedEmployeeRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './Employees.component.html',
  animations: [appModuleAnimation()]
})
export class EmployeesComponent extends PagedListingComponentBase<EmployeeDtos> {
  employees: EmployeeDtos[] = [];
  item : [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _EmployeeService: EmployeeServiceProxy,
    private _modalService: BsModalService,
    // private _EmployeeProfile:EmployeeProfileComponent
    private router: Router

  ) {
    super(injector);
  }

  list(
    request: PagedEmployeeRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._EmployeeService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EmployeeDtosPagedResultDto) => {
        this.employees = result.items;
          this.showPaging(result, pageNumber);
        // this.employees.forEach(element => {
        //  element['dob'] =  moment(element['dob'],'MM/DD/YYYY');
        // });
       
        //  this.showPaging(result, pageNumber);
      });
  }

  delete(Employee: EmployeeDtos ): void {
    debugger
    abp.message.confirm(
      this.l('EmployeeDeleteWarningMessage',Employee.firstName + Employee.lastName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._EmployeeService
            .delete(Employee.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createEmployee(): void {
    this.router.navigate(['/app/employees/create']);
  }

  editEmployee(Employee: EmployeeDtos): void {

      if(Employee.id) {
        debugger
        this.router.navigate(['/app/employees/profile',{ id : Employee.id}]);

      }
  }
  DetailEmployee(Employee: EmployeeDtos): void 
  {

    if(Employee.id) {
      debugger
      this.router.navigate(['/app/employees/profiledetail',{ id : Employee.id}]);

    }
  }
//   showCreateOrEditEmployeeDialog(id?: number): void {
//     let createOrEditemployeeDialog: BsModalRef;
//     if (!id) {
//       createOrEditemployeeDialog = this._modalService.show(
//         CreateEmployeeDialogComponent,
//         {
//           class: 'modal-lg',
//         }
//       );
//     } 
    
//     else {
//       createOrEditemployeeDialog = this._modalService.show(
//         EditEmployeeDialogComponent,
//         {
//           class: 'modal-lg',
//           initialState: {
//             id: id,
//           },
//         }
//       );
//     }

//     createOrEditemployeeDialog.content.onSave.subscribe(() => {
//       this.refresh();
//     });
//   }

//   clearFilters(): void {
//     this.keyword = '';
//     this.isActive = undefined;
//     this.getDataPage(1);
//   }
}
