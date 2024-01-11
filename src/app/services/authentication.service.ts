import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInterface, ApiResponseInterface } from '../interfaces/common-interface';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
export interface User {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Creates an instance of authentication service.
   * @param http 
   * @param router 
   */
  constructor( private http:HttpClient,  private router: Router, private localStorage:LocalStorageService) { }

  /**
   * Logs in
   * @param loginData 
   * @returns in 
   */
  logIn(loginData:LoginInterface):Observable<ApiResponseInterface>{
    return this.http.post<ApiResponseInterface>(`${environment.ADMIN_API_URL}login`,loginData ) 
  }

  /**
   * Sets token
   * @param token 
   */
 
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Gets token
   * @returns token 
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Determines whether logged in is
   * @returns  
   */
  isLoggedIn() {
    return this.getToken() !== null;
  }

  /**
   * Logouts authentication service
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

 
}
