import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeServiceProxy, WorkExperienceDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: './create-work-experience-dialog.component.html',
})
export class CreateWorkExperienceComponent extends AppComponentBase  implements OnInit {

    work: WorkExperienceDto = new WorkExperienceDto();
    saving: boolean;

    @Output() onSave = new EventEmitter<any>();

    jobTitles: any[] = [ ]

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef,
        private employeeService: EmployeeServiceProxy
    ) { 
        super(injector);
    }

    ngOnInit() { 
        debugger;
        if(this.work.startDate != null)
        {
        this.work.startDate =moment(this.work.startDate).format('MM/DD/YYYY');
        }
        if(this.work.endDate != null)
        {
            this.work.endDate =moment(this.work.endDate).format('MM/DD/YYYY');
        }
    }

    // getDesignation() {
    //     this.employeeService.getDesignation().subscribe((d: any[]) => {
    //         d.forEach(element => {
    //             this.jobTitles.push({ label: element['name'], value: element['id'] })
    //         });
    //     });
    // }

    save() {
        // this.employeeService
        // .update(this.work)
        // .pipe(
        //   finalize(() => {
        //     this.saving = false;
        //   })
        // )
        // .subscribe(() => {
          this.notify.info(this.l('Changed Successfully'));
          this.bsModalRef.hide();
          this.onSave.emit(this.work);
        // });
    }

    cancel() {
        this.bsModalRef.hide();
    }
}
