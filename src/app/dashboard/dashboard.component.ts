import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FetchapiService } from '../fetchapi.service';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

 import { NzMessageService } from 'ng-zorro-antd/message';

// import { Table } from 'antd';
// import { AuthService } from '../auth.service';
// import { NzTableModule } from 'ng-zorro-antd/table';

// import { NzModalI18nInterface } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  studentdata: any = [];
  // count!: number;
// count : number= 
  popconfirm!:boolean

  // renderitem !:TemplateRef<{ $implicit: 'page' | 'prev' | 'next'| 'prev_5'| 'next_5', page: number }>
  
  // whatever service imported inject it inside constructor
  constructor(
    private router: Router,
    private service: FetchapiService,
    private commonservice: CommonService,
    private authService: AuthService,
    private  nzMessageService: NzMessageService,
    private http: HttpClient // private authService:AuthService,
  ) {
    // usually method defined in .html say (onclick)="onedit()" can be directly used in .html directly
    // but for methods in some service importn n inject in constr giving var...use var.methodname in this cmpnt
    // say service.deletestud etc...
  }

  ngOnInit() {
    // as dashboard cmpnt loads,then itself the data posted (stored in datavarible)is fetched into table
    // if(!this.authService.isAuthenticated()){
    //   this.router.navigate(['/']);
    // }
    this.loadDashboardData();

    // this.service.getstudent().subscribe(res=>{
    //   this.studentdata=res;
    // })
  }


  loadDashboardData() {
    this.service.getstudent().subscribe((res) => {
      this.studentdata = res;
    });
  }

  onaddstudent() {
    // this.authService.login()
    this.router.navigate(['/addstudent']);
  }

  onlogout() {
    this.authService.logout();
    // logout method's
    this.router.navigate(['/login']);
  }

  ondelete(id: number) {
    this.service.deletestudent(id).subscribe((res) => {
      this.studentdata = this.studentdata.filter(
        (student: any) => student.id != id
      );
      // filters all those data ;not of given id in delete btn
      // and posted into server,which is studentdata ..already get response done-line 24
      // studentdata will comprise only that data which id doesn't match ie..matched id not shown in table ie deleted
    });
  }

  onedit(id: number, input: any) {
    // this.authService.login(); rather use negative authguard-w/o login won't goto dashboard,addstud due to canactivateguard
    // now if canactivateguard given to db,addstud then only after login, they are accessible;
    // remove guard to addstud,editstud so that from dashboard goesto addstud, but now w/o login directly goes to addstud,editstud

    this.router.navigate(['/editstudent', id]);
    console.log('see certain sdata', input);
    //below
    //  let currentStudent = this.studentdata.find((p: { id: number; }) => { return p.id === id });

    this.service.editstudent(id, input).subscribe((res) => {
      console.log('same sdata', res);

      this.commonservice.sendClick();
    });
  }
  // inside subscribe is server res
  // this.id here id not in ""..so not as string hence interpolates


  cancel(): void {
    this.nzMessageService.info('click cancel');
    this.popconfirm=false
  }

  confirm(id:number): void {
    this.nzMessageService.info('click confirm');
    this.service.deletestudent(id).subscribe((res) => {
      this.studentdata = this.studentdata.filter(
        (student: any) => student.id != id
      );
    })
  }

}
