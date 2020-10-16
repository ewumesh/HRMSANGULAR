import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateLeaveRequestComponent } from '../apply-for-leave/create-leave-request/create-leave-request.component';

@Component({
    templateUrl: './leave-request.component.html'
})
export class LeaveRequestComponent implements OnInit {
    leaveRequests: any[] = [];

    constructor(
        private _modalService: BsModalService
    ) { }

    ngOnInit(): void { }

    createLeaveRequest(): void {
        this.showCreateOrEditLeaveRequestDialog();
    }

    editLeaveRequest(a: any) {
        this.showCreateOrEditLeaveRequestDialog(a.id);
    }

    showCreateOrEditLeaveRequestDialog(id?: number): void {
        let createOrEditLeaveRequestDialog: BsModalRef;
        if (!id) {
            createOrEditLeaveRequestDialog = this._modalService.show(
                CreateLeaveRequestComponent,
                {
                    class: 'modal-lg',
                }
            );
        }

        else {
            createOrEditLeaveRequestDialog = this._modalService.show(
                CreateLeaveRequestComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    },
                }
            );
        }
    }
}
