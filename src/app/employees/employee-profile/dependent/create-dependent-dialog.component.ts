import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DepartmentDtos, DependentDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../../shared/app-component-base';


@Component({
    templateUrl: './create-dependent-dialog.component.html',
})
export class CreateDependentComponent extends AppComponentBase implements OnInit {
    dependent: DependentDto = new DependentDto();
    saving: boolean;
    @Output() onSave = new EventEmitter<any>();
    genders: any[] = [
        { label: 'Male' },
        { label: 'Female' }
    ]

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef,
        private _employeeService: EmployeeServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.dependent = this.dependent;
        if(this.dependent.dob != null)
        {
            this.dependent.dob = moment(this.dependent.dob).format('MM/DD/YYYY')
        }
    }

    save() {
        // this.employeeService
        //     .update(this.dependent)
        //     .pipe(
        //         finalize(() => {
        //             this.saving = false;
        //         })
        //     )
        //     .subscribe(() => {
                this.notify.info(this.l('Changed Successfully'));
                this.bsModalRef.hide();
                this.onSave.emit(this.dependent);
            // });
    }

    cancel() {
        this.bsModalRef.hide();
    }
}
