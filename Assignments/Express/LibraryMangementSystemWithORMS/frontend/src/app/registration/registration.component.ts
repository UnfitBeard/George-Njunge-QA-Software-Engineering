import { Component, inject, numberAttribute } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationData = {
    name: '',
    email:'',
    password:'',
    role_id:''
  }


  constructor(private authService: AuthService, private router: Router) {}
    myForm = new FormGroup({
      name:new FormControl('', [Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required]),
      role_id:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    })

  onSubmit() {
    if (this.myForm.invalid) {
      console.warn("All fields are required!");
      return;
    }

    const {name, email, password, role_id} = this.myForm.value

    if (name && email && password && role_id) {
      this.authService.register(name ,email ,password , Number(role_id)).subscribe(
        response => {
          console.log("Registration Sucessful")
          this.router.navigate(['login'])
        },error => {
          console.log("Registration failed: ", error)
          alert("Registration failed. Please try again.");
        }
      )
      return
    }

  }

}
