import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { AuthService } from '../auth.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  }
form: any;

constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe(
        response=>{
          console.log("Login sucessful")
        },
        error=>{
          console.log("Login failed")
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }
}
