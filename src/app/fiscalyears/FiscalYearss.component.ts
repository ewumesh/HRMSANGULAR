import { Component, Injector,ViewChild  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  FiscalYearServiceProxy,
  FiscalYearDtos,
  FiscalYearDtosPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateFiscalYearDialogComponent } from './create-fiscalyear/create-fiscalyear-dialog.component';
import { EditFiscalYearDialogComponent } from './edit-fiscalyear/edit-fiscalyear-dialog.component';
class PagedFiscalYearRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './FiscalYears.component.html',
  animations: [appModuleAnimation()]
})
export class FiscalYearsComponent extends PagedListingComponentBase<FiscalYearDtos> {
  FiscalYears: FiscalYearDtos[] = [];
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
    private _FiscalYearService: FiscalYearServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected  list(
    request: PagedFiscalYearRequestDto,
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
    this._FiscalYearService
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
      .subscribe((result: FiscalYearDtosPagedResultDto) => {
        this.FiscalYears = result.items;
         this.showPaging(result, pageNumber);
        
      });
  }

  delete(FiscalYear: FiscalYearDtos ): void {
    debugger
    abp.message.confirm(
      this.l('FiscalYearDeleteWarningMessage',FiscalYear.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._FiscalYearService
            .delete(FiscalYear.id)
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

  createFiscalYear(): void {
    this.showCreateOrEditFiscalYearDialog();
  }

  editFiscalYear(FiscalYear: FiscalYearDtos): void {
    this.showCreateOrEditFiscalYearDialog(FiscalYear.id);
  }

  showCreateOrEditFiscalYearDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateFiscalYearDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditFiscalYearDialogComponent,
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
