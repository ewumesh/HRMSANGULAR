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
  FiscalYearServiceProxy,
  FiscalYearDtos
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-fiscalYear-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class EditFiscalYearDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  FiscalYear: FiscalYearDtos = new FiscalYearDtos();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _FiscalYearService: FiscalYearServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._FiscalYearService.get(this.id).subscribe((result: FiscalYearDtos) => {
      this.FiscalYear = result;
    });
  }

  save(): void {
    this.saving = true;

    this._FiscalYearService
      .update(this.FiscalYear)
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
