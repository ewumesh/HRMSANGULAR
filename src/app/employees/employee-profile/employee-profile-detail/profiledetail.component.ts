import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { CreateWorkExperienceComponent } from './work-experience/create-work-experience-dialog.component';
// import { CreateEducationComponent } from './education/create-education-dialog.component';
// import { CreateDepartmentComponent } from './department/create-department-dialog.component';
import {
    EmployeeServiceProxy,
    EmployeeDtos,
    BasicInfoDto, DepartmentDtos, DesignationDtos, UserDto,
    WorkDto,PersonalDetailsDto
  } from '@shared/service-proxies/service-proxies';
  import {SelectItem} from 'primeng/api';
import { ThrowStmt } from '@angular/compiler';
import { rest } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './profiledetail.component.html'
})
export class EmployeeProfileDetailComponent implements OnInit {
    id: number
    Employee: EmployeeDtos = new EmployeeDtos();
    constructor(
        public _EmployeeService : EmployeeServiceProxy,
        private _Activatedroute:ActivatedRoute,
       private _router:Router,
    ) { }

  
    sub;
    ngOnInit(): void {
      
        this.id =this.id;
        this.sub=this._Activatedroute.paramMap.subscribe(params => { 
             this.id = Number(params.get('id')); 
             this._EmployeeService.getById(this.id).subscribe((result: EmployeeDtos) => {
                this.Employee = result;
            });
         });
       
    }

    onBack(): void {
        this._router.navigate(['/app/employees']);
     }

}
