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
  DepartmentServiceProxy,
  DepartmentDtos
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['../../../shared/components/grid/designation.css']
})
export class EditDepartmentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  department: DepartmentDtos = new DepartmentDtos();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _DepartmentService: DepartmentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
 
  ngOnInit(): void {
    this._DepartmentService.get(this.id).subscribe((result: DepartmentDtos) => {
      this.department = result;
    });
  }

  save(): void {
    this.saving = true;

    this._DepartmentService
      .update(this.department)
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
