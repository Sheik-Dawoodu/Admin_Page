import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/common-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  /**
   * Gets all user
   * @returns all user 
   */
  getAllUser():Observable<ApiResponseInterface>{
    return this.http.get<ApiResponseInterface> (`${environment.ADMIN_API_URL}list-users`)
  }

  /**
   * Gets user by id
   * @param id 
   * @returns user by id 
   */
  getUserById(id:string):Observable<ApiResponseInterface>{
    return this.http.get<ApiResponseInterface>(`${environment.ADMIN_API_URL}user-details/${id}`)
  }
  
  blockUser(id: string):Observable<ApiResponseInterface>{
    return this.http.patch<ApiResponseInterface>(`${environment.ADMIN_API_URL}block-user/${id}`,null)
  }
  UnBlockUser(id: string):Observable<ApiResponseInterface>{
    return this.http.patch<ApiResponseInterface>(`${environment.ADMIN_API_URL}unblock-user/${id}`,null)
  }
}
