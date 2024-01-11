import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseInterface, CategoryManagementInterface } from '../interfaces/common-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   * Creates an instance of category service.
   * @param http 
   */
  constructor(private http:HttpClient) { }

  /**
   * Gets category
   * @returns category 
   */
  getCategory(): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${environment.ADMIN_API_URL}categories`)
  }

  /**
   * Posts category
   * @param catogryData 
   * @returns category 
   */
  postCategory(catogryData:any):Observable<ApiResponseInterface>{
    return this.http.post<ApiResponseInterface>(`${environment.ADMIN_API_URL}category`,catogryData)
  }

  /**
   * Updates category
   * @param id 
   * @param categories 
   * @returns category 
   */
  updateCategory(id: string, categories: any):Observable<ApiResponseInterface>{
    return this.http.patch<ApiResponseInterface>(`${environment.ADMIN_API_URL}category/${id}`,categories)
  }
 
  /**
   * Gets catogry by id
   * @param id 
   * @returns catogry by id 
   */
  getCatogryById(id:string):Observable<ApiResponseInterface>{
    return this.http.get<ApiResponseInterface>(`${environment.ADMIN_API_URL}category/${id}`)
  }
  /**
   * Delets category
   * @param id 
   * @returns category 
   */
  deletCategory(id:string):Observable<ApiResponseInterface>{
    return this.http.delete<ApiResponseInterface>(`${environment.ADMIN_API_URL}category/${id}`,)
  }

  /**
   * Files uplode
   * @param catogryData 
   * @returns uplode 
   */
  fileUplode(catogryData:any):Observable<any>{
    return this.http.post<any>(`${environment.ASSET_BASE_URL}upload`,catogryData)
  }
}
