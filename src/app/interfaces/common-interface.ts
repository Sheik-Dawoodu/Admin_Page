export interface CommonInterface {
}

/**
 * Api response interface
 */
export interface ApiResponseInterface {
    value(value: any): unknown
    data: any,
    message: string,
    status: boolean,
    status_code: number
  }

  /**
   * Login interface
   */
  export interface LoginInterface {
    email: string,
    password: string
  }
  
  /**
   * Category management interface
   */
  export interface CategoryManagementInterface{
    name: string,
    image:File
  }
  
  /**
   * User management interface
   */
  export interface UserManagementInterface{
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: number,
    is_seller: boolean, 
  }

  