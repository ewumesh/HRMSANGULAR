import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateCompanyDto,
  CompanyServiceProxy
} from '@shared/service-proxies/service-proxies';
import { ThrowStmt } from '@angular/compiler';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { serialize } from 'v8';

@Component({
  templateUrl: 'create-company-dialog.component.html'
})
export class CreateCompanyDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  company: CreateCompanyDto = new CreateCompanyDto();
  selectedFile: File = null;
  private newBlogForm: FormGroup;
  uploadedFiles: any[] = [];
  uploadUrl : string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _companyService: CompanyServiceProxy,
    public bsModalRef: BsModalRef,
    private http: HttpClient
  ) {
    super(injector);
    this.uploadUrl = 'http://localhost:21021/TestAppFileUpload/UploadFile';
  }
  ngOnInit(): void {
    // this..isActive = true;
    this.newBlogForm = new FormGroup({
      name: new FormControl(null),
      companyLogo: new FormControl(null)
    });
  }
  onUpload(event : any) {
    
        // this.company.companyLogo = event.files[0];
        // this.selectedFile = event.files[0];
        this.selectedFile = <File>event.files[0];
        // this.company.companyLogo = <File>event.target.files[0];
  
  }
  // myUploader(event):void{
 
  //   console.log('My File upload',event);
   
  //    if(event.files.length == 0){
   
  //       console.log('No file selected.');
   
  //      return;
   
  //     }
   
  //   var fileToUpload = event.files[0];
   
  //   let input = new FormData();
   
  //   input.append("file", fileToUpload);
   
  //   this.http
   
  //     .post(this.uploadUrl, input)
   
  //     .subscribe(res => {
   
  //     console.log(res);
   
  //   });
  // }
   
  // upload completed event
   
  // onUpload(event): void {
   
  //   for (const file of event.files) {
   
  //      this.uploadedFiles.push(file);
   
  //   }
   
  // }
   
  onBeforeSend(event): void {
   
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
   
  }
   


  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }
  
  onSubmit(data) {
    
    // let finaldata = serialize(data);
    const formData = new FormData();
    // formData.set()
    formData.set('name', data.name);
    formData.set('companyLogo', this.selectedFile);
  
    // this.http.post('http://localhost:21021/api/services/app/Company/UploadFile?file=', this.selectedFile)
    // .subscribe(res => {
  
    //   alert('Uploaded!!');
    // });
    this.http.post(this.uploadUrl, this.selectedFile)
    .subscribe(res => {
  
      alert('Uploaded!!');
    });
    this.onSave.emit();
    // this.newBlogForm.reset();
  }

  // save(): void {
  //   // this.saving = true;
  //   // this.company.companyLogo = this.selectedFile;
  //   // this.company.companyLogo('TileImage', this.selectedFile);
  //   // this.company.companyLogo = this.uploadedFiles;
  //   this._companyService
  //     .create(this.company)
  //     .pipe(
  //       finalize(() => {
  //         this.saving = false;
  //       })
  //     )
  //     .subscribe(() => {
  //       this.notify.info(this.l('SavedSuccessfully'));
  //       this.bsModalRef.hide();
  //       this.onSave.emit();
  //     });
  // }
}
