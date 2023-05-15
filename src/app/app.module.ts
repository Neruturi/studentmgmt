import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddstudentComponent } from './addstudent/addstudent.component';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzSpaceModule } from 'ng-zorro-antd/space';

import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';

// nzbutton importes in app module such that can be used in entire file in any component
registerLocaleData(en);

@NgModule({
  // the imported modules in appmodule can be directly utilised in different cmpnts mentioned inside declarations
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddstudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzTableModule,
    NzPaginationModule,
    NzGridModule,
    NzFormModule,
    NzRadioModule,
    NzSelectModule,
    NzSpaceModule,
    NzPopconfirmModule,

  ],
  // make those dependencies available for injection across the entire application.
  // Angular creates a single instance of that service and shares it throughout the application. 
  providers: [{ provide: NZ_I18N, useValue: en_US },NzMessageService],
  // whatever extrnl service here zorro ,mention inside providers
  // our own service files inside app,import in req cmpnt
  bootstrap: [AppComponent],
})
export class AppModule {}
