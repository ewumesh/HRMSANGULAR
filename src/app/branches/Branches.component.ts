import { Component, Injector,ViewChild  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  BranchServiceProxy,
  BranchDtos,
  BranchDtosPagedResultDto,
  GetUpdateCompanyDto
} from '@shared/service-proxies/service-proxies';
import { CreateBranchDialogComponent } from './create-branch/create-branch-dialog.component';
import { EditBranchDialogComponent } from './edit-branch/edit-branch-dialog.component';
class PagedBranchRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
import { Table } from 'primeng/table';
import { ThrowStmt } from '@angular/compiler';

@Component({
  templateUrl: './Branches.component.html',
  animations: [appModuleAnimation()]
})
export class BranchesComponent extends PagedListingComponentBase<BranchDtos> {
  Branches: BranchDtos[] = [];
  Brancheslazy: BranchDtos[] = [];
  item : [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  totalRecords: number;

    cols: any[];

    loading: boolean;
    lazyfilter : FilterMetadata;

  @ViewChild('dt') table: Table;
  constructor(
    injector: Injector,
    private _Brancheservice: BranchServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected  list(
    request: PagedBranchRequestDto,
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
    this._Brancheservice
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
      .subscribe((result: BranchDtosPagedResultDto) => {
        this.Branches = result.items;
        //  this.showPaging(result, pageNumber);
         this.totalRecords = result.items.length;
        //  this.loading = true;
        
      });
     
      // this._Brancheservice.getAllCompany()
      // .subscribe((result: GetUpdateCompanyDto[]) => {
      //   this.Branches.forEach(ele => {
      //    ele.companyName = result.find(x=> x.id == ele.company_Id).name;
      //   })   
      // })  
  }
  filter(event)
  {this._Brancheservice
    .getAll(
      event.target.value,
      true,
      0,
      event.target.size
      // request.keyword,
      // request.isActive,
      // request.skipCount,
      // request.maxResultCount
    )
    .subscribe((result: BranchDtosPagedResultDto) => {
      this.Branches = result.items;
      //  this.showPaging(result, pageNumber);
      
    });

  }
  loadCustomers(event: LazyLoadEvent) {  
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    // event.filters = {
    //   "Keyword" :
    //   {
    //     value : this.keyword,
    //     matchMode : "contains"

    //   }
    // }
    //imitate db connection over a network
    this.Branches
    setTimeout(() => {
        if (this.Branches) {
            this.Brancheslazy = this.Branches.slice(event.first, (event.first + event.rows));
            this.loading = false;
        }
    }, 1000);
}

  delete(Branch: BranchDtos ): void {
    debugger
    abp.message.confirm(
      this.l('BranchDeleteWarningMessage',Branch.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._Brancheservice
            .delete(Branch.id)
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

  createBranch(): void {
    this.showCreateOrEditBranchDialog();
  }

  editBranch(Branch: BranchDtos): void {
    this.showCreateOrEditBranchDialog(Branch.id);
  }

  showCreateOrEditBranchDialog(id?: number): void {
    let createOrEditcomapnyDialog: BsModalRef;
    if (!id) {
      createOrEditcomapnyDialog = this._modalService.show(
        CreateBranchDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } 
    
    else {
      createOrEditcomapnyDialog = this._modalService.show(
        EditBranchDialogComponent,
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
