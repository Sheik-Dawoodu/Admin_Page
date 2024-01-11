import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of auth interceptor.
   * @param auth
   */
  constructor(private auth: AuthenticationService) {}

  /**
   * Intercepts auth interceptor
   * @param request
   * @param next
   * @returns intercept
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getToken();
    console.log('AuthToken', authToken)
    if(authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
   
    return next.handle(request);
  }
}
