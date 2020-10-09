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
//   CreateEmployeeDto,
//   EmployeeServiceProxy,
//   DropDownDto,
//   GetUpdateGenericListDto
// } from '@shared/service-proxies/service-proxies';
// import { SelectItem } from 'primeng/api';

// @Component({
//   templateUrl: 'create-employee-dialog.component.html'
// })
// export class CreateEmployeeDialogComponent extends AppComponentBase
//   implements OnInit {
//   saving = false;
//   employee: CreateEmployeeDto = new CreateEmployeeDto();
//   Dropdown = new DropDownDto();
//   dropitem: SelectItem[] = [];

//   @Output() onSave = new EventEmitter<any>();

//   constructor(
//     injector: Injector,
//     public _EmployeeService: EmployeeServiceProxy,
//     public bsModalRefEmp: BsModalRef
//   ) {
//     super(injector);
//   }
//   ngOnInit(): void {
//     // this..isActive = true;
//     this.Dropdown.keyword = "Designation";
//     this._EmployeeService.dropDownList(this.Dropdown).subscribe((result: GetUpdateGenericListDto[]) => {
//       result.forEach(element => {
//         this.dropitem.push({ label: element['value'], value: element['id'] })
//       });
//     });
//   }

//   save(): void {
//     this.saving = true;

//     this._EmployeeService
//       .create(this.employee)
//       .pipe(
//         finalize(() => {
//           this.saving = false;
//         })
//       )
//       .subscribe(() => {
//         this.notify.info(this.l('SavedSuccessfully'));
//         this.bsModalRefEmp.hide();
//         this.onSave.emit();
//       });
//   }
// }
