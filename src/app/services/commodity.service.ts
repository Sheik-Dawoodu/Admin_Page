import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseInterface } from '../interfaces/common-interface';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  /**
   * Creates an instance of category service.
   * @param http 
   */
  constructor(private http:HttpClient) { }

  /**
   * Gets category
   * @returns category 
   */
  getCommodity(): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${environment.ADMIN_API_URL}commodities`)
  }

  /**
   * Posts category
   * @param catogryData 
   * @returns category 
   */
  postCommodity(catogryData:any):Observable<ApiResponseInterface>{
    return this.http.post<ApiResponseInterface>(`${environment.ADMIN_API_URL}commodity`,catogryData)
  }

  /**
   * Updates category
   * @param id 
   * @param categories 
   * @returns category 
   */
  updateCommodity(id: string, commodity: any):Observable<ApiResponseInterface>{
    return this.http.patch<ApiResponseInterface>(`${environment.ADMIN_API_URL}commodity/${id}`,commodity)
  }
 
  /**
   * Gets catogry by id
   * @param id 
   * @returns catogry by id 
   */
  getCommodityById(id:string):Observable<ApiResponseInterface>{
    return this.http.get<ApiResponseInterface>(`${environment.ADMIN_API_URL}commodity/${id}`)
  }
  /**
   * Delets category
   * @param id 
   * @returns category 
   */
  deletCommodity(id:string):Observable<ApiResponseInterface>{
    return this.http.delete<ApiResponseInterface>(`${environment.ADMIN_API_URL}commodity/${id}`,)
  }

  /**
   * Files uplode
   * @param catogryData 
   * @returns uplode 
   */
  fileUplode(commodityData:any):Observable<any>{
    return this.http.post<any>(`${environment.ASSET_BASE_URL}upload`,commodityData)
  }
}
