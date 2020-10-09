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
  CreateShiftDto,
  ShiftServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-Shift-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class CreateShiftDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  Shift: CreateShiftDto = new CreateShiftDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _ShiftService: ShiftServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this..isActive = true;
  }

  save(): void {
    this.saving = true;

    this._ShiftService
      .create(this.Shift)
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
