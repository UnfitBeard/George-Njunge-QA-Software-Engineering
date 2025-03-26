import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  }
form: any;

constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe(
        response=>{
          console.log("Login sucessful")
          this.router.navigate(['admin-dashboard'])
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
