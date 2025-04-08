import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { Router } from '@angular/router';
import { RecruitersDashboardComponent } from "./recruiters-dashboard/recruiters-dashboard.component";
import { JobseekerDashboardComponent } from "./jobseeker-dashboard/jobseeker-dashboard.component";
import { ProfileEditorComponent } from "./profile-editor/profile-editor.component";
import { JobApplicationComponent } from "./job-application/job-application.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, LandingPageComponent, LoginPageComponent, RegistrationPageComponent, RecruitersDashboardComponent, JobseekerDashboardComponent, ProfileEditorComponent, JobApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SkillsMatch';

  constructor(private router: Router) {}
  loginRedirect() {
    this.router.navigate(['login'])
  }
}
