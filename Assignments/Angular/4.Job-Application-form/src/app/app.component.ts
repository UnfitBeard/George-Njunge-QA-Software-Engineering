import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
removeSkill(_t25: number) {
throw new Error('Method not implemented.');
}
  developerForm: FormGroup;
  skillsList = ['Angular', 'HTML', 'CSS', 'JS']

  constructor(private fb: FormBuilder) {
    this.developerForm = this.fb.group({
      skill: new FormControl(''),
      skills: this.fb.array([])
    })
  }

  getSkills(): FormArray {
    return this.developerForm.get("skills") as FormArray
  }

  addSkills() {
    const skillGroup = this.fb.group({
      skill: new FormControl(''),
      experience: new FormControl('')
    });
    this.getSkills().push(skillGroup)
  }
  onSubmit() {
    if(this.developerForm.valid){
      alert("You have succesfully appplied")
    }
  }
  title = '4.Job-Application-form';
}
