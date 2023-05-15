import { Injectable, inject } from '@angular/core';
// route guard interfaces accept these complex data structures which are used internally by the router- to be tested
// j spies to isolate test of cmpnt dependent on another cmpnt
// spy matchers-toHaveBeenCalled etc to check if fn call suucessful/not -stubs fn call
// combo of spyOn and toHaveBeenCalled- stubs fn call and isolates testing
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })


// export class AuthGuard implements CanActivate {
//   constructor(private authService:AuthService,private router :Router ){
//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot):boolean| Observable<boolean> |Promise<boolean>{
//       const isLoggedIn=this.authService.isAuthenticated();
      

//       if(isLoggedIn){
//         return true;
//       }
//       else{
//         this.router.navigate(['/login'])
//         return false;
//       }
//     }
    
    
//   }
  export const AuthGuard:CanActivateFn=(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  )=>{
    let authService=inject(AuthService);
    let router=inject(Router);
    let userloggedout=authService.isAuthenticated();
    let isLoggedIn=authService.isAuthenticated();
    if(isLoggedIn=='true'){
      return true;
    }else{
      router.navigate(['/login']);
      return false;
    }
  }
  

