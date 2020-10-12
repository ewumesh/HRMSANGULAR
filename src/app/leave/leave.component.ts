import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { DepartmentDtos } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateLeaveTypeComponent } from './create-leave-type/create-leave-type.component';

@Component({
    templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {

    leaves: any[] =[];

    constructor(
        // injector: Injector,
        // public bsModalRef: BsModalRef,
        private _modalService: BsModalService
    ) { 
        // super(injector); 
    }

    ngOnInit(): void { }

    createLeaveType(): void {
        this.showCreateOrEditLeaveTypeDialog();
    }

    editLeaveType(Department: any) {
        this.showCreateOrEditLeaveTypeDialog(Department.id);
    }

    showCreateOrEditLeaveTypeDialog(id?: number): void {
        let createOrEditcomapnyDialog: BsModalRef;
        if (!id) {
            createOrEditcomapnyDialog = this._modalService.show(
                CreateLeaveTypeComponent,
                {
                    class: 'modal-lg',
                }
            );
        }

        else {
            createOrEditcomapnyDialog = this._modalService.show(
                CreateLeaveTypeComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    },
                }
            );
        }

        // createOrEditcomapnyDialog.content.onSave.subscribe(() => {
        //     this.refresh();
        // });
    }

    deleteLeaveType(id: number) {

    }

    refresh() {}
}
