// import {
//   Component,
//   Injector,
//   OnInit,
//   Output,
//   EventEmitter
// } from '@angular/core';
// import { finalize } from 'rxjs/operators';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { AppComponentBase } from '@shared/app-component-base';
// import {
//   EmployeeServiceProxy,
//   GetUpdateEmployeeDto,
//   DropDownDto,
//   GetUpdateGenericListDto
// } from '@shared/service-proxies/service-proxies';
// import {SelectItem} from 'primeng/api';
// import { Calendar } from 'primeng/calendar';
// import * as moment from 'moment';
// import { ThrowStmt } from '@angular/compiler';
// @Component({
//   templateUrl: 'edit-employee-dialog.component.html'
// })
// export class EditEmployeeDialogComponent extends AppComponentBase
//   implements OnInit {
//   saving = false;
//   Employee: GetUpdateEmployeeDto = new GetUpdateEmployeeDto();
//   id: number;
//   Dropdown = new DropDownDto();
//   dropitem : SelectItem[] = [];
//   designation :SelectItem;
//   dob? : Date;
//   // dobdate: Calendar;

//   @Output() onSave = new EventEmitter<any>();

//   constructor(
//     injector: Injector,
//     public _EmployeeService: EmployeeServiceProxy,
//     public bsModalRef: BsModalRef
//   ) {
//     super(injector);
//   }
 
//   ngOnInit(): void {
//     this.Dropdown.keyword = "Designation";
//     this._EmployeeService.dropDownList(this.Dropdown).subscribe((result: GetUpdateGenericListDto[]) => {
//       result.forEach(element => {
//         this.dropitem.push({label:element['value'],value:element['id']})
//       });
//     });
//     this._EmployeeService.getEmployeeById(this.id).subscribe((result: GetUpdateEmployeeDto) => {
//       this.Employee = result;
//       // moment(this.Employee.dob).format('MM/DD/YYYY');
//       this.designation = this.dropitem.find(x=> x.value == result.designation);
       
//       //  this.dob =  moment(this.Employee.dob.toString(),'MM/DD/YYYY').toDate();
//       //  let tmpDate: string = moment(result.dob).format('MM/DD/YYYY');
//       // this.Employee.dob = this.Convert(this.Employee.dob);
//     //  this.dob = ne ;
//     });
  
//   }

//    Convert (str)
//    {
    
//       var date = new Date(str),
//         mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//         day = ("0" + date.getDate()).slice(-2);
//       return [date.getFullYear(), mnth, day].join("-");
//    }
//   save(): void {
//     this.saving = true;

//     this._EmployeeService
//       .update(this.Employee)
//       .pipe(
//         finalize(() => {
//           this.saving = false;
//         })
//       )
//       .subscribe(() => {
//         this.notify.info(this.l('ChangedSuccessfully'));
//         this.bsModalRef.hide();
//         this.onSave.emit();
//       });
//   }
// }
