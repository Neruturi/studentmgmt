import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchapiService {

  constructor(private http:HttpClient ) { }


  url='http://localhost:3000/posts';

  // whatever data avaialble in db.json (after posted/pushed into posts array) reflected in table 
  getstudent(){
    return this.http.get(this.url);
    // get loads data from server (after posted) ie,data into table...get data into addstudent form
  }

  // whatever data entered in form goes to dbfile..as onsubmit is given..
  // define a variable that holds the form data and post method sends data to sever url
  poststudent(data:any){
return this.http.post(this.url,data)
  }

  deletestudent(id:number){
    return this.http.delete(this.url +'/' + id)
    
  }

  editstudent(id:number,inputdata:any){
    return this.http.put(this.url + '/' + id, inputdata);

  //   return this.http.put(this.url,body:any|null,Option:{

    }

  updatestudent(id: number, inputdata: any) {
    return this.http.put(this.url + '/' + id, inputdata);
    // modify/overwrite the data in server(after posted into server-url)
  }

  }

//  put(url: string, body: any | null, options: {
//   headers?: HttpHeaders | {
//     [header: string]: string | string[];
// };
// context?: HttpContext;
// observe?: 'body';
// params?: HttpParams | {
//     [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
// };
// reportProgress?: boolean;
// responseType: 'arraybuffer';
// withCredentials?: boolean;
// }): Observable<ArrayBuffer>;









