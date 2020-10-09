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
  CreateFiscalYearDto,
  FiscalYearServiceProxy
} from '@shared/service-proxies/service-proxies';
@Component({
  templateUrl: 'create-fiscalYear-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']

})
export class CreateFiscalYearDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  fontweight : any;
  FiscalYear: CreateFiscalYearDto = new CreateFiscalYearDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _FiscalYearService: FiscalYearServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this..isActive = true;
    this.fontweight = '400';
  }
  CheckEVT(val):void
  {
    alert(val)
    
  }
  save(): void {
    this.saving = true;
    this._FiscalYearService
      .create(this.FiscalYear)
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
