import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  ShiftServiceProxy,
  ShiftDtos,
  ShiftDtosPagedResultDto
  
} from '@shared/service-proxies/service-proxies';
import { CreateShiftDialogComponent } from './create-shift/create-shift-dialog.component';
import { EditShiftDialogComponent } from './edit-shift/edit-shift-dialog.component';

class PagedShiftRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './Shifts.component.html',
  animations: [appModuleAnimation()]
})
export class ShiftsComponent extends PagedListingComponentBase<ShiftDtos> {
  Shifts: ShiftDtos[] = [];
  item : [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _ShiftService: ShiftServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedShiftRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this._ShiftService
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
      .subscribe((result: ShiftDtosPagedResultDto ) => {
        this.Shifts = result.items;
          this.showPaging(result, pageNumber);
      });
  }

  delete(Shift: ShiftDtos ): void {
    debugger
    abp.message.confirm(
      this.l('ShiftDeleteWarningMessage',Shift.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._ShiftService
            .delete(Shift.id)
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

  createShift(): void {
    this.showCreateOrEditShiftDialog();
  }

  editShift(Shift: ShiftDtos): void {
    this.showCreateOrEditShiftDialog(Shift.id);
  }

  showCreateOrEditShiftDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateShiftDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditShiftDialogComponent,
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
