import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  // freshly declare a variable in authservice ..define method to give dif values the variable..use method in login cmpnt

  constructor(private http:HttpClient) { }
login(){
  this.isLoggedIn=true;
  // Storing a boolean value in local storage
localStorage.setItem('logstatus', 'true');
// when browser refreshed the value is lost,hence the value is stored in mem using local storage of browser 
// what value u wana store,give it some variable and as k:v in .setItem method, value taken as true as login got done
// const emptyData: any[] = [];
//     this.http.put('/db.json', emptyData);

  // despite leuser in router-outlet of nav.html,now with rguard, leusers cmpnt opens only after clcicking login(ie authentic admin etc)
}

logout(){
  this.isLoggedIn=false;
  localStorage.setItem('logstatus', "false");
  // can be observed in console for each login and logout done
  // localStorage.removeItem('logstatus')
}

isAuthenticated(){
  // let finalstatus=JSON.parse(localStorage.getItem('logstatus'));
  let finalstatus=localStorage.getItem('logstatus')
  // console.log('final', finalstatus)
  return finalstatus;
  // return this.isLoggedIn;
}
}


