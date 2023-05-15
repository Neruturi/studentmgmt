// 116,59-common service -appmodule 22 -dash.ts 70 here 53
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  ValidationErrors,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { FetchapiService } from '../fetchapi.service';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css'],
})

//

// }
export class AddstudentComponent {
  id!: number;
  currentstudent: any = [];
  allstudents: any = [];
  validateForm!: UntypedFormGroup;
  editmode: boolean = false;
  ClickEventSub!: Subscription;

  constructor(
    private router: Router,
    private service: FetchapiService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private commonservice: CommonService
  ) {
    this.ClickEventSub = this.commonservice.getClick().subscribe((std) => {
      console.log(this.editmode);
    });
  }

  ngOnInit(): void {
    // if addstudent cmpnt loads then on creation itself formfields are null
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      // the same names in formbuilder to be used in formcontrolname to validate
    });

    this.id = this.route.snapshot.params['id'];
    this.id = Number(this.id);

    this.service.getstudent().subscribe((res) => {
      this.allstudents = res;
      console.log('from all data', this.allstudents);
      this.currentstudent = this.allstudents.filter(
        (eachstudent: { id: number }) => eachstudent.id === this.id
      );
      console.log('intial vales', this.currentstudent);
      // methods of the Angular FormGroup:
      // setValue sets value of formfield as given replacing default /null
      // mention all the controls of a form group while setting the form value with the setValue() method
      this.validateForm.controls['name'].setValue(
        `${this.currentstudent[0].name}`
      );
      this.validateForm.controls['subject'].setValue(
        `${this.currentstudent[0].subject}`
      );
      this.validateForm.controls['grade'].setValue(
        `${this.currentstudent[0].grade}`
      );
      // lets you set the value of any individual form control you want.-patchValue
      this.reflectdata();
      // above method take editmode as true as it loads with existing data and runs if block of postStudentDetails
    });
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
      console.log('entry done', this.validateForm.value);
      // this.service
      //   .poststudent(this.validateForm.value)
      //   .subscribe((response: any) => {
      //     alert('saved successfully');
      //     this.router.navigate(['/dashboard']);
      //   });
    }
  }

  oncancel() {
    this.router.navigate(['/dashboard']);
  }
  postStudentDetails() {
    if (!this.editmode) {
      this.service.poststudent(this.validateForm.value).subscribe((res) => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.service
        .updatestudent(this.currentstudent[0].id, this.validateForm.value)
        // above method in fetchservice with PUT-overrides/modifies existing data
        .subscribe({
          next: (res) => {
            // GET loads the data posted into the table
            this.service.getstudent().subscribe((res) => {
              this.allstudents = res;

              this.router.navigate(['/dashboard']);
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  reflectdata() {
    this.editmode = true;
  }
}
