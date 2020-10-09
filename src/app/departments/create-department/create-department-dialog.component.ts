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
  CreateDepartmentDto,
  DepartmentServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-department-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class CreateDepartmentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  department: CreateDepartmentDto = new CreateDepartmentDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _DepartmentService: DepartmentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this..isActive = true;
  }

  save(): void {
    this.saving = true;

    this._DepartmentService
      .create(this.department)
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
