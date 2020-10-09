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
  DesignationServiceProxy,
  DesignationDtos
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-designation-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class EditDesignationDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  Designation: DesignationDtos = new DesignationDtos();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _DesignationService: DesignationServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._DesignationService.get(this.id).subscribe((result: DesignationDtos) => {
      this.Designation = result;
    });
  }

  save(): void {
    this.saving = true;

    this._DesignationService
      .update(this.Designation)
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
