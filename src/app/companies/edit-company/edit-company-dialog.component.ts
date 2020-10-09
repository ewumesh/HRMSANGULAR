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
  CompanyServiceProxy,
  CompanyDtos
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-company-dialog.component.html'
})
export class EditCompanyDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  company: CompanyDtos = new CompanyDtos();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _companyService: CompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._companyService.get(this.id).subscribe((result: CompanyDtos) => {
      this.company = result;
    });
  }

  save(): void {
    this.saving = true;

    this._companyService
      .update(this.company)
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
