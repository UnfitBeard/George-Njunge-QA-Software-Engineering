import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  selectedRole: string = ''

  onRoleSelected(role: string) {
    this.selectedRole = role
    //
    this.myForm.get('role')?.setValue(role);

    if(role === 'Admin') {
      this.router.navigate(['Admin-dashboard'])
    }
  }
  constructor(private router: Router) { }

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$')]),
    role: new FormControl('',Validators.required)
  })

  onSubmit() {
    console.log(this.myForm.value)
  }

}
