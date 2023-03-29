import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

// The AuthGuard is an Angular service for guarding routes by checking if the user has the necessary authentication and authorization.
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  // The canActivate method is required by the CanActivate interface.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // If the authentication token exists, the user is allowed access to the route.
    if (this.authService.getToken() !== null) {
      // The roles associated with the route are retrieved from the route data.
      const role = route.data['roles'] as Array<string>;

      // If the route requires roles, the user's role is compared to the required roles.
      if (role) {
        const match = this.userService.roleMatch(role);

        // If the user's role matches the required roles, the user is allowed access to the route.
        if (match) {
          return true;
        // If the user's role does not match the required roles, the user is redirected to the forbidden page and access to the route is denied.
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    // If the authentication token does not exist, the user is redirected to the login page and access to the route is denied.
    this.router.navigate(['/login']);
    return false;
  }
}


