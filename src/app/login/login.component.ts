import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchapiService } from '../fetchapi.service';
// import { NzButtonModule } from 'ng-zorro-antd/button';

import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  edata!:any;
  studentdata: any = [];
userloggedin=localStorage.getItem('logstatus')

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: FetchapiService,
    private http: HttpClient // private nzButtonModule: NzButtonModule such injecting is req only for service
  ) {}
  ngOnInit(): void {
    if(this.userloggedin=="true"){
      this.router.navigate(['/dashboard'])
    }
    const emptyData: any[] = [];
    this.http.put('/db.json', emptyData).subscribe( (res)=>{
      this.edata=res;
      console.log("data in db.json",res)
      // this.http.get(this.url).subscri
      this.service.getstudent().subscribe((res) => {
        this.studentdata = this.edata;
      });
    })
  }

  onlogin() {
    // const emptyData: any[] = [];
    // this.http.put('/db.json', emptyData);
     this.authService.login();
    this.router.navigate(['/dashboard']);



  }
}
