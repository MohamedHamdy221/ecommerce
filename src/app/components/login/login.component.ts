import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

  msgError:string='';
  mgSuccess:boolean=false
 isLoading:boolean=false
 
 loginForm:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required , Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
 })
 

confirmPassword(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
    return null
  }
  else{
    return {mismatch:true}
  }
}

loginSubmit():void{
  
  
  if(this.loginForm.valid){
    this.isLoading=true
    
    this._AuthService.setLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        //"success"

        console.log(res)
        if(res.message == 'success'){
          this.mgSuccess=true;
          setTimeout(()=>{
//1-save token
localStorage.setItem('userToken',res.token);
//2-dCode Token
this._AuthService.saveUserData();
//3-navigate to login

            this._Router.navigate(['/home'])
          },1000)
        }
        this.isLoading=false
      },
      error:(err:HttpErrorResponse)=>{
        //msgError-----
        this.msgError = err.error.message
        console.log(err)
        this.isLoading=false
      }
    })
  }
  else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()
  }
 }
}
