import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './create-leave-type.component.html',
})
export class CreateLeaveTypeComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef
        ) {
            super(injector);
         }

    ngOnInit() { }

    save() {
        
    }
}
