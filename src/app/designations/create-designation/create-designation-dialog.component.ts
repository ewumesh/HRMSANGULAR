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
  CreateDesignationDto,
  DesignationServiceProxy
} from '@shared/service-proxies/service-proxies';
@Component({
  templateUrl: 'create-designation-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']

})
export class CreateDesignationDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  fontweight : any;
  Designation: CreateDesignationDto = new CreateDesignationDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _DesignationService: DesignationServiceProxy,
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
    this._DesignationService
      .create(this.Designation)
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
