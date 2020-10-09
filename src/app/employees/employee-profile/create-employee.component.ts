import { Component, Injector, OnInit } from '@angular/core';
import { CreateEmployeeDto, DropDownDto, EmployeeServiceProxy, GetUpdateGenericListDto, UserDto,CounterDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWorkExperienceComponent } from './work-experience/create-work-experience-dialog.component';
import { CreateEducationComponent } from './education/create-education-dialog.component';
import { CreateDependentComponent } from './dependent/create-dependent-dialog.component';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { SelectItem } from 'primeng/api';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
    templateUrl: './create-employee.component.html',
})
export class CreateEmployeeComponent extends AppComponentBase implements OnInit {

    experiences: any[] = [
        // { id: 1, sn: 1, jobTitle: 'Java Developer', previousCompany: 'Merojob', jobDescription: 'Description not added yet', startDate: '2012', endDate: '2015' }
    ];
    education: any[] = [
        // { id: 1, sn: 1, schoolName: 'Kathmandu Unified city', degress: 'Bachelor', fieldOfStudy: 'Managemnet', yearOfCompletion: '2018', interest: 'Software Development' }
    ];
    dependents: any[] = [
        // { id: 1, sn: 1, dependentName: 'Rajesh Hamal', gender: 'Male', relationship: 'Brother', dob: '1997' }
    ];



    // Dropdowns
    jobTitles: SelectItem[] = [];
    departments: SelectItem[] = [];
    UserDropD : SelectItem[] = [];
    maritalStatus: any[] = [{id: 1212, name: 'Married', value: 'Married'}, {id: 586, name: 'Unmarried', value: 'Unmarried'}];
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

    employee: CreateEmployeeDto = new CreateEmployeeDto();

    constructor(
        injector: Injector,
        private _modalService: BsModalService,
        private employeeService: EmployeeServiceProxy,
        private router: Router
    ) { super(injector); }

    ngOnInit() {
        this.getDesignation();
        this.getDepartment();
        this.getReporttoUserDropdown();
        this.getEmployeeIdentification();
    }

    getDesignation() {
        this.employeeService.getDesignation().subscribe((d: any[]) => {
            d.forEach(element => {
                this.jobTitles.push({ label: element['name'], value: element['id'] })
            });
        });
    }

    getDepartment() {
        this.employeeService.getDepartment().subscribe((_: any[]) => {
            _.forEach(d => {
                this.departments.push({ label: d['name'], value: d['id'] })
            })
            console.log(this.departments);
        })
    }
    getEmployeeIdentification()
    {
        this.employeeService.getcounter().subscribe((result: CounterDto) => {
            this.employee.employeeIdNumber = result.employeeIdNo;
        })
    }
    getReporttoUserDropdown()
    {
        this.employeeService.gettoreportuser()
        .subscribe((result: UserDto[]) => {
         result.forEach(element => {
           this.UserDropD.push({label:element['fullName'],value:element['id']})
         });
        })          
    }
    // For Work experiences
    createWorkExperience() {
        this.showCreateOrEditWorkExperienceDialog();
    }

    editWorkExperience(d: any) {
        this.showCreateOrEditWorkExperienceDialog(d);
    }

    showCreateOrEditWorkExperienceDialog(id?: number): void {
        let createOrEditWorkExperienceDialog: BsModalRef;
        let value = this.experiences.find(_ => _.id === id);
        if (!id) {
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

        createOrEditWorkExperienceDialog.content.onSave.subscribe((a: { id: number; sn: number; }) => {
            //   this.refresh();
            if (value === a) {
            } else {
                a.id = this.experiences.length + 1;
                a.sn = this.experiences.length + 1;
                this.experiences.push(a);
            }
        });

    }

    deleteWorkExperience(id?: number) {
        abp.message.confirm(
            this.l('', this.employee.firstName),
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

    showCreateOrEditEducationDialog(id?: number): void {
        let createOrEditEducationDialog: BsModalRef;
        let value = this.education.find(_ => _.id === id);
        if (!id) {
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



        createOrEditEducationDialog.content.onSave.subscribe((a) => {
            //   this.refresh();
            if (value === a) {
            } else {
                a.id = this.education.length + 1;
                a.sn = this.education.length + 1;
                this.education.push(a);
            }
        });

    }

    deleteEducation(id?: number) {
        abp.message.confirm(
            this.l('', this.employee.firstName),
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

    showCreateOrEditDependentDialog(id?: number): void {
        let createOrEditDependentDialog: BsModalRef;
        let value = this.dependents.find(_ => _.id === id);
        if (!id) {
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

        createOrEditDependentDialog.content.onSave.subscribe((a) => {
            //   this.refresh();
            if (value === a) {
            } else {
                a.id = this.dependents.length + 1;
                a.sn = this.dependents.length + 1;
                this.dependents.push(a);
            }
        });
    }

    deleteDependent(id?: number) {
        abp.message.confirm(
            this.l('', this.employee.firstName),
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

    saveChanges() {
        let value = this.employee;
        value.workExperiences = this.experiences;
        value.educations = this.education;
        value.dependents = this.dependents;
        console.log(this.employee);
        this.employeeService
            .create(this.employee)
            .pipe(
                finalize(() => {
                    console.log('Worked!!');
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.router.navigate(['/app/employees'])
            });
    }
}