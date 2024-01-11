import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ApiResponseInterface } from 'src/app/interfaces/common-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  private toastService = HotToastService;

  /**
   * Creates an instance of login component.
   * @param _fb 
   * @param _router 
   * @param _authService 
   * @param _localStorageService 
   */
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthenticationService,
    private _localStorageService: LocalStorageService 
    
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Determines whether submit on
   */
  public onSubmit() {
    console.log(this.loginForm.value);
      if(this.loginForm.valid){
        this._authService.logIn(this.loginForm.value).subscribe({
          next:(response:ApiResponseInterface)=>{
            console.log('login response', )
            // this._localStorageService.storeUserData(response.data)
            this._localStorageService.storeData('is-logged-in',true)
            this._authService.setToken(response.data.session.session_token)
            console.log(response);
            console.log(response.data);
            this._router.navigate(['/categories'])
          },
          error:(err:HttpErrorResponse)=>{
           console.log(err);
          }
        })
      }
      else{
        this.loginForm.markAllAsTouched();
       }
}
}