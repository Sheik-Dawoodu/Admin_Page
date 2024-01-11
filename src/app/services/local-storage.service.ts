import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Creates an instance of local storage service.
   */
  constructor() { }

  /**
   * Stores data
   * @param key 
   * @param value 
   */
  public storeData(key: string, value: any): void {
    const data = environment.ENCRYPT_LOCAL_STORAGE ? CryptoJS.AES.encrypt(JSON.stringify(value), environment.LOCAL_STORAGE_SECRET).toString() : JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  /**
   * Stores user data
   * @param data 
   * @returns user data 
   */
  public storeUserData(data: any): void {
    if (!data) return;
    const userData = environment.ENCRYPT_LOCAL_STORAGE ? CryptoJS.AES.encrypt(JSON.stringify(data), environment.LOCAL_STORAGE_SECRET).toString() : JSON.stringify(data);
    localStorage.setItem('admin', userData);
  }

  public getDataByKey(key: string): any {
    if (!localStorage.getItem(key)) return null;
    const data = environment.ENCRYPT_LOCAL_STORAGE ? CryptoJS.AES.decrypt(localStorage.getItem(key)!, environment.LOCAL_STORAGE_SECRET).toString(CryptoJS.enc.Utf8) : localStorage.getItem(key)!;
    return JSON.parse(data);
  }

}
