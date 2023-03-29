import {
  HttpErrorResponse,
HttpEvent,
HttpHandler,
HttpInterceptor,
HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';

// The AuthInterceptor is an Angular service for intercepting HTTP requests and adding an authorization token to the request headers.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // The constructor initializes the AuthService and Router services as private properties of the class.
  constructor(private authService: AuthService, private router: Router) {}

  // The intercept method is required by the HttpInterceptor interface.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the No-Auth header is set to 'True', the original request is returned without modification.
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    // If the No-Auth header is not set to 'True', the token is retrieved from the AuthService.
    const token = this.authService.getToken();
    // The addToken method is called to add the token to the request headers.
    req = this.addToken(req, token);

    // The modified request is passed to the next interceptor in the chain and the response is returned as an Observable.
    return next.handle(req).pipe(
      // If an error occurs during the HTTP request, catchError handles it.
      catchError((err: HttpErrorResponse) => {
        // The error status is logged to the console for debugging purposes.
        console.log(err.status);
        // If the error status is 401, the user is redirected to the login page.
        if (err.status === 401) {
          this.router.navigate(['/login']);
        // If the error status is 403, the user is redirected to the forbidden page.
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        // A throwError is returned with a message indicating something went wrong.
        return throwError('Something went wrong.');
      })
    );
  }

  // The addToken method is a private helper function that creates a new request with the Authorization header set to the authentication token.
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
