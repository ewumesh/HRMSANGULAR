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
  ShiftServiceProxy,
  ShiftDtos
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  templateUrl: './edit-Shift-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class EditShiftDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  Shift: ShiftDtos = new ShiftDtos();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _ShiftService: ShiftServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._ShiftService.get(this.id).subscribe((result: ShiftDtos) => {
      this.Shift = result;
      var Starttime = moment(result.startTime).format('HH:mm');
      var Endtime = moment(result.endTime).format('HH:mm');
      this.Shift.startTime = Starttime;
      this.Shift.endTime = Endtime;
      
    });
  }

  save(): void {
    this.saving = true;

    this._ShiftService
      .update(this.Shift)
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
