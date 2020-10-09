import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  CompanyServiceProxy,
  CompanyDtos,
  CompanyDtosPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateCompanyDialogComponent } from './create-company/create-company-dialog.component';
import { EditCompanyDialogComponent } from './edit-company/edit-company-dialog.component';

class PagedCompanyRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './Companies.component.html',
  animations: [appModuleAnimation()]
})
export class CompaniesComponent extends PagedListingComponentBase<CompanyDtos> {
  companies: CompanyDtos[] = [];
  item : [];
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _companyService: CompanyServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedCompanyRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    this._companyService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CompanyDtosPagedResultDto) => {
        this.companies = result.items;
       this.showPaging(result, pageNumber);
      });
  }

  delete(company: CompanyDtos ): void {
    debugger
    abp.message.confirm(
      this.l('CompanyDeleteWarningMessage',company.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._companyService
            .delete(company.id)
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

  createCompany(): void {
    this.showCreateOrEditCompanyDialog();
  }

  editCompany(company: CompanyDtos): void {
    this.showCreateOrEditCompanyDialog(company.id);
  }

  showCreateOrEditCompanyDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateCompanyDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditCompanyDialogComponent,
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
    this.getDataPage(1);
  }
}
