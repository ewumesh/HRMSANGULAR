import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { EducationDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
    templateUrl: './create-education-dialog.component.html',
})
export class CreateEducationComponent extends AppComponentBase implements OnInit {

    education: EducationDto = new EducationDto();
    saving: boolean;
    @Output() onSave = new EventEmitter<any>();

    degrees: any[] = [
        { label: 'Master', id: 1785 }
    ]

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit() {
        this.education = this.education;
    }

    save() {
        // this.employeeService
        //     .update(this.education)
        //     .pipe(
        //         finalize(() => {
        //             this.saving = false;
        //         })
        //     )
        //     .subscribe(() => {
                this.notify.info(this.l('Changed Successfully'));
                this.bsModalRef.hide();
                this.onSave.emit(this.education);
            // });
    }

    cancel() {
        this.bsModalRef.hide();
    }
}
