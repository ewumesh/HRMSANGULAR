import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWorkExperienceComponent } from './work-experience/create-work-experience-dialog.component';
import { CreateEducationComponent } from './education/create-education-dialog.component';
import { CreateDependentComponent } from './dependent/create-dependent-dialog.component';
import { finalize } from 'rxjs/operators';
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
import { timeStamp } from 'console';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';

@Component({
    templateUrl: './profile.component.html'
})
export class EmployeeProfileComponent extends AppComponentBase implements OnInit {
    id: number
    saving = false;
    Employee: EmployeeDtos = new EmployeeDtos();
    BasicInfoData : BasicInfoDto = new BasicInfoDto();
    WorkInfoData : WorkDto = new WorkDto();
    PersonalDetailData :PersonalDetailsDto = new PersonalDetailsDto();
    DesignationDropD : SelectItem[] = [];   
    DepartmentDropD : SelectItem[] = [];
    UserDropD : SelectItem[] = [];
    designationId : SelectItem;
    departmentId : SelectItem;
    reportingTo : SelectItem;
    sourceOfHire : SelectItem;
    country : SelectItem;   
    gender : SelectItem;   
    maritalStatus : SelectItem;
    experiences: any[] = [
    ];
    education: any[] = [
    ];
    dependents: any[] = [
    ];
    constructor(
        injector: Injector,
        private _modalService: BsModalService,
        public _EmployeeService : EmployeeServiceProxy,
        private _Activatedroute:ActivatedRoute,
       private _router:Router,
    ) {  super(injector);}

    basicInfo: boolean = true;
    work: boolean = true;
    personalDetail: boolean = true;

    // Forms Dropdowns
    SourceOfHireDropD: any[] = [
        { label: 'TV', value: 'TV'},
        { label: 'Friends', value: 'Friends' },
        { label: 'News', value:  'News' },
        { label: 'College', value: 'College' },
    ]
    CountryDropD: any[] = [
        { label: 'Nepal', value: 'Nepal'},
        { label: 'India', value: 'India' },
        { label: 'USA', value:  'USA' },
        { label: 'China', value: 'China' },
    ]
    GenderDropD: any[] = [
        { label: 'Male', value: 'Male'},
        { label: 'Female', value: 'Female' },
        { label: 'Other', value:  'Other' },
    ]
    MaratialStatusDropD: any[] = [
        { label: 'Unmarried', value: 'Unmarried'},
        { label: 'Married', value: 'Married' },
    ]
    // End Forms Dropdowns

    // Tables
    // experiences: any[] = [
    //     {
    //         sn: 1, previousCompany: 'ABC company limited', jobDesc: 'Not available',
    //         jobTitle: 'Designer', startDate: '2020', endDate: '2025'
    //     }
    // ];
    // education: any[] = [
    //     {
    //         sn: 1, schoolName: 'Kathmandu Unified city', degree: 'Bachelor of Arts', field: 'Designing',
    //         year: '2025', intrest: 'Specialized in image editing'
    //     }
    // ];
    // dependents: any[] = [
    //     { sn: 1, dependentName: 'Ramesh Adhikari', gender: 'Male', relationship: 'Son', dob: '1998' }
    // ];

    sub;
    ngOnInit(): void {
      
        this.getDepartmentDropdown();
        this.getDesignationDropdown();
        this.getReporttoUserDropdown();
        // this.id =this.id;
          
        this.sub=this._Activatedroute.paramMap.subscribe(params => { 
             this.id = Number(params.get('id')); 
             this.callonUpdate(this.id)
            //  this._EmployeeService.getById(this.id).subscribe((result: EmployeeDtos) => {
            //     this.Employee = result;
            //     this.designationId = this.DesignationDropD.find(x=> x.value == result.designationId);
            //     this.departmentId = this.DepartmentDropD.find(x=> x.value == result.departmentId);
            //     this.reportingTo = this.UserDropD.find(x=> x.value == result.reportingTo);
            //     this.sourceOfHire = this.SourceOfHireDropD.find(x=> x.value == result.sourceOfHire);
            //     this.country = this.CountryDropD.find(x=> x.value == result.country);
            //     this.gender = this.GenderDropD.find(x=> x.value == result.gender);
            //     this.maritalStatus = this.MaratialStatusDropD.find(x=> x.value == result.maritalStatus);
            // });
         });
       
    }
    callonUpdate(id)
    {
            this._EmployeeService.getById(id).subscribe((result: EmployeeDtos) => {
               this.Employee = result;
               debugger
            //    var newdate = new Date(result.dateOfHire.toString().split('T')[0]);
            //    var Dobdate = moment(result.dateOfHire).format('MM/DD/YYYY');
            //    this.Employee.dateOfHire =  Dobdate;           
               this.experiences = result.workExperiences;
               this.education = result.educations;
               this.dependents = result.dependents;
               this.designationId = this.DesignationDropD.find(x=> x.value == result.designationId);
               this.departmentId = this.DepartmentDropD.find(x=> x.value == result.departmentId);
               this.reportingTo = this.UserDropD.find(x=> x.value == result.reportingTo);
               this.sourceOfHire = this.SourceOfHireDropD.find(x=> x.value == result.sourceOfHire);
               this.country = this.CountryDropD.find(x=> x.value == result.country);
               this.gender = this.GenderDropD.find(x=> x.value == result.gender);
               this.maritalStatus = this.MaratialStatusDropD.find(x=> x.value == result.maritalStatus);
           });
    }

    getDesignationDropdown()
    {
        this._EmployeeService.getDesignation()
        .subscribe((result: DesignationDtos[]) => {
         result.forEach(element => {
           this.DesignationDropD.push({label:element['name'],value:element['id']})
         });
        })          
    }
    getDepartmentDropdown()
    {
        this._EmployeeService.getDepartment()
        .subscribe((result: DepartmentDtos[]) => {
         result.forEach(element => {
           this.DepartmentDropD.push({label:element['name'],value:element['id']})
         });
        })          
    }
    getReporttoUserDropdown()
    {
        this._EmployeeService.gettoreportuser()
        .subscribe((result: UserDto[]) => {
         result.forEach(element => {
           this.UserDropD.push({label:element['fullName'],value:element['id']})
         });
        })          
    }
    // Edit inline toggle
    editBasicInfo() {
        this.basicInfo = !this.basicInfo;
    }
    UpdateBasicInfo(){
        debugger
        this.saving = true;
       this.BasicInfoData.firstName = this.Employee.firstName;
       this.BasicInfoData.lastName = this.Employee.lastName;
       this.BasicInfoData.employeeIdNumber = this.Employee.employeeIdNumber;
       this.BasicInfoData.employeeId = this.Employee.id;
       this.BasicInfoData.email = this.Employee.email;
       this._EmployeeService.basicInfo(this.BasicInfoData).pipe(
        finalize(() => {
          this.saving = false;
        })
      ).subscribe((result)=>{
         if(result == "success")
         {
            abp.notify.success('Successfully Updated');
             this.editBasicInfo();
             this.callonUpdate(this.id);
         }
       });
    }
    UpdateWorkInfo()
    {
       this.WorkInfoData.employeeId = this.Employee.id;
       this.WorkInfoData.designationId = this.Employee.designationId;
       this.WorkInfoData.departmentId = this.Employee.departmentId;
       this.WorkInfoData.reportingTo = this.Employee.reportingTo;
       this.WorkInfoData.dateOfHire = this.Employee.dateOfHire;
       this.WorkInfoData.sourceOfHire = this.Employee.sourceOfHire;
       this.WorkInfoData.employeeStatus = this.Employee.employeeStatus;
       this.WorkInfoData.workPhone = this.Employee.workPhone;
       this.WorkInfoData.employeeType = this.Employee.employeeType;
       this._EmployeeService.work(this.WorkInfoData).subscribe((result)=>{
         if(result == "success")
         {
            abp.notify.success('Successfully Updated');
             this.editWork();
             this.callonUpdate(this.id);
         }
       }); 
    }
    editWork() {
        this.work = !this.work;
    }

    UpdatePersonalDetail()
    {
        debugger
        this.PersonalDetailData.employeeId = this.Employee.id;
        this.PersonalDetailData.address = this.Employee.address;
        this.PersonalDetailData.country = this.Employee.country;
        this.PersonalDetailData.state = this.Employee.state;
        this.PersonalDetailData.phone = this.Employee.phone;
        this.PersonalDetailData.dob = this.Employee.dob;
        this.PersonalDetailData.gender = this.Employee.gender;
        this.PersonalDetailData.nationality = this.Employee.nationality;
        this.PersonalDetailData.maritalStatus = this.Employee.maritalStatus;
        this._EmployeeService.personalDetails(this.PersonalDetailData).subscribe((result)=>{
          if(result == "success")
          {
             abp.notify.success('Successfully Updated');
              this.editPersonalDetail();
              this.callonUpdate(this.id);
          }
        }); 
    }
    editPersonalDetail() {
        this.personalDetail = !this.personalDetail;
    }
    // End edit inline toggle


    // For Work experiences
    createWorkExperience() {
        this.showCreateOrEditWorkExperienceDialog();
    }

    editWorkExperience(d: any) {
        debugger
        this.showCreateOrEditWorkExperienceDialog(d);
    }
    showCreateOrEditWorkExperienceDialog(value?: number): void {
        let createOrEditWorkExperienceDialog: BsModalRef;
        // let value = this.experiences.find(_ => _.id === id);
        if (!value) {
            createOrEditWorkExperienceDialog = this._modalService.show(
                CreateWorkExperienceComponent,
                {
                    class: 'modal-md',
                }
            );
        }

        else {
            createOrEditWorkExperienceDialog = this._modalService.show(
                CreateWorkExperienceComponent,
                {
                    class: 'modal-md',
                    initialState: {
                        // id: id
                        work: value
                    },
                }
            );
        }

        createOrEditWorkExperienceDialog.content.onSave.subscribe((a: any) => {
            //   this.refresh();
            if (value === a) {
            } else {
                // a.id = this.experiences.length + 1;
                // a.sn = this.experiences.length + 1;
                this.experiences.push(a);
            }
        });

    }

    deleteWorkExperience(id?: number) {
        abp.message.confirm(
            this.l('', this.Employee.firstName),
            undefined,
            (result: boolean) => {
                if (result) {
                    // Service logic here
                    // ....

                    let d = this.experiences.findIndex(_ => _.id === id);
                    this.experiences.splice(d, 1);
                    this.notify.info(this.l('Deleted Successfully'));
                }
            }
        );
    }

    createEducation() {
        this.showCreateOrEditEducationDialog();
    }

    editEducation(d: any) {
        this.showCreateOrEditEducationDialog(d);
    }

    showCreateOrEditEducationDialog(value?: number): void {
        let createOrEditEducationDialog: BsModalRef;
        // let value = this.education.find(_ => _.id === id);
        if (!value) {
            createOrEditEducationDialog = this._modalService.show(
                CreateEducationComponent,
                {
                    class: 'modal-md',
                }
            );
        }

        else {
            createOrEditEducationDialog = this._modalService.show(
                CreateEducationComponent,
                {
                    class: 'modal-md',
                    initialState: {
                        // id: id,
                        education: value
                    },
                }
            );
        }



        createOrEditEducationDialog.content.onSave.subscribe((a : any) => {
            //   this.refresh();
            if (value === a) {
            } else {
                // a.id = this.education.length + 1;
                // a.sn = this.education.length + 1;
                this.education.push(a);
            }
        });

    }

    deleteEducation(id?: number) {
        abp.message.confirm(
            this.l('', this.Employee.firstName),
            undefined,
            (result: boolean) => {
                if (result) {
                    // Service logic here
                    // ....

                    let d = this.education.findIndex(_ => _.id === id);
                    this.education.splice(d, 1);
                    this.notify.info(this.l('Deleted Successfully'));
                }
            }
        );
    }

    createDependent() {
        this.showCreateOrEditDependentDialog();
    }

    editDependent(d: any) {
        debugger
        this.showCreateOrEditDependentDialog(d);
    }

    showCreateOrEditDependentDialog(value?: number): void {
        let createOrEditDependentDialog: BsModalRef;
        // let value = this.dependents.find(_ => _.id === id);
        if (!value) {
            createOrEditDependentDialog = this._modalService.show(
                CreateDependentComponent,
                {
                    class: 'modal-md',
                }
            );
        }

        else {
            createOrEditDependentDialog = this._modalService.show(
                CreateDependentComponent,
                {
                    class: 'modal-md',
                    initialState: {
                        // id: id,
                        dependent: value
                    },

                }
            );
        }

        createOrEditDependentDialog.content.onSave.subscribe((a: any) => {
            //   this.refresh();
            if (value === a) {
            } else {
                // a.id = this.dependents.length + 1;
                // a.sn = this.dependents.length + 1;
                this.dependents.push(a);
            }
        });
    }

    deleteDependent(id?: number) {
        abp.message.confirm(
            this.l('', this.Employee.firstName),
            undefined,
            (result: boolean) => {
                if (result) {
                    // Service logic here
                    // ....

                    let d = this.dependents.findIndex(_ => _.id === id);
                    this.dependents.splice(d, 1);
                    this.notify.info(this.l('Deleted Successfully'));
                }
            }
        );
    }
    UpdateAll(Emp : any)
    {
        this._EmployeeService.update(Emp).subscribe((result : EmployeeDtos)=>{
           if(result!= null){
             this.Employee = result;
             abp.notify.success('Successfully Updated');
             if(this.basicInfo == false )
             {
             this.editBasicInfo();
             }
             if(this.work == false )
             {
             this.editWork();
             }
             if(this.personalDetail == false )
             {
             this.editPersonalDetail();
             }
             this.callonUpdate(this.id);
           }
          }); 
    }

    update() {

    }
    onBack(): void {
        this._router.navigate(['/app/employees']);
     }

}
