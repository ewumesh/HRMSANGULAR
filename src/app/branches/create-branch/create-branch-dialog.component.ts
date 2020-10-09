import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateBranchDto,
  BranchServiceProxy,
  GetUpdateCompanyDto
} from '@shared/service-proxies/service-proxies';
import {SelectItem} from 'primeng/api';
@Component({
  templateUrl: 'create-branch-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']

})
export class CreateBranchDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  //fontweight : any;
  Branch: CreateBranchDto = new CreateBranchDto();
  dropitem : SelectItem[] = [];
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _BranchService: BranchServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this..isActive = true;
   // this.fontweight = '400';
   this._BranchService.getAllCompany()
   .subscribe((result: GetUpdateCompanyDto[]) => {
    result.forEach(element => {
      this.dropitem.push({label:element['name'],value:element['id']})
    });

   })

  }
  CheckEVT(val):void
  {
    alert(val)
    
  }
  save(): void {
    this.saving = true;
    this._BranchService
      .create(this.Branch)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
