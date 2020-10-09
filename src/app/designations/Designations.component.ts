import { Component, Injector,ViewChild  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  DesignationServiceProxy,
  DesignationDtos,
  DesignationDtosPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateDesignationDialogComponent } from './create-designation/create-designation-dialog.component';
import { EditDesignationDialogComponent } from './edit-designation/edit-designation-dialog.component';
class PagedDesignationRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './designations.component.html',
  animations: [appModuleAnimation()]
})
export class DesignationsComponent extends PagedListingComponentBase<DesignationDtos> {
  Designations: DesignationDtos[] = [];
  item : [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  // totalItems : number;
  // loading: boolean = true;
  cols: any[];
  // @ViewChild('dt') table: Table;
  constructor(
    injector: Injector,
    private _DesignationService: DesignationServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected  list(
    request: PagedDesignationRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    // this.loading = false;
  //   this.cols = [
  //     { field: 'name', header: 'Name' },
  //     { field: 'code', header: 'Code' },
  //     { field: 'description', header: 'Description' },
  //     { field: 'isActive', header: 'IsActive' }
  // ];
    this._DesignationService
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
      .subscribe((result: DesignationDtosPagedResultDto) => {
        this.Designations = result.items;
         this.showPaging(result, pageNumber);
        
      });
  }

  delete(Designation: DesignationDtos ): void {
    debugger
    abp.message.confirm(
      this.l('DesignationDeleteWarningMessage',Designation.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._DesignationService
            .delete(Designation.id)
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

  createDesignation(): void {
    this.showCreateOrEditDesignationDialog();
  }

  editDesignation(Designation: DesignationDtos): void {
    this.showCreateOrEditDesignationDialog(Designation.id);
  }

  showCreateOrEditDesignationDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateDesignationDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditDesignationDialogComponent,
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
