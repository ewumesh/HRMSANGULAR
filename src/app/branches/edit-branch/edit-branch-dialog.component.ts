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
import {SelectItem} from 'primeng/api';
import {
  BranchServiceProxy,
  BranchDtos,
  GetUpdateCompanyDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-branch-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class EditBranchDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  Branch: BranchDtos = new BranchDtos();
  id: number;
  dropitem : SelectItem[] = [];
  company_Id : SelectItem;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _BranchService: BranchServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._BranchService.getAllCompany()
    .subscribe((result: GetUpdateCompanyDto[]) => {
     result.forEach(element => {
       this.dropitem.push({label:element['name'],value:element['id']})
     });
 
    })  
    this._BranchService.get(this.id).subscribe((result: BranchDtos) => {
      this.Branch = result;
      this.company_Id = this.dropitem.find(x=> x.value == result.company_Id);
    });
  }

  save(): void {
    this.saving = true;

    this._BranchService
      .update(this.Branch)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('ChangedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
