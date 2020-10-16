import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './create-leave-request.component.html'
})
export class CreateLeaveRequestComponent extends AppComponentBase implements OnInit {
    leaveTypes: any[] =[];

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef
        ) {
            super(injector);
         }

    ngOnInit(): void { }

    save() {

    }
}
