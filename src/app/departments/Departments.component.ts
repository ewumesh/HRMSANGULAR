import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  DepartmentServiceProxy,
  DepartmentDtos,
  DepartmentDtosPagedResultDto
  
} from '@shared/service-proxies/service-proxies';
import { CreateDepartmentDialogComponent } from './create-department/create-department-dialog.component';
import { EditDepartmentDialogComponent } from './edit-department/edit-department-dialog.component';

class PagedDepartmentRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './Departments.component.html',
  animations: [appModuleAnimation()]
})
export class DepartmentsComponent extends PagedListingComponentBase<DepartmentDtos> {
  departments: DepartmentDtos[] = [];
  item : [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _DepartmentService: DepartmentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedDepartmentRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this._DepartmentService
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
      .subscribe((result: DepartmentDtosPagedResultDto ) => {
        this.departments = result.items;
          this.showPaging(result, pageNumber);
      });
  }

  delete(Department: DepartmentDtos ): void {
    debugger
    abp.message.confirm(
      this.l('DepartmentDeleteWarningMessage',Department.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._DepartmentService
            .delete(Department.id)
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

  createDepartment(): void {
    this.showCreateOrEditDepartmentDialog();
  }

  editDepartment(Department: DepartmentDtos): void {
    this.showCreateOrEditDepartmentDialog(Department.id);
  }

  showCreateOrEditDepartmentDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateDepartmentDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditDepartmentDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditcomapnyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }
}
