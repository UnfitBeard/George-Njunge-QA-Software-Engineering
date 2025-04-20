import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { RecruitersDashboardComponent } from './recruiters-dashboard/recruiters-dashboard.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { JobseekerDashboardComponent } from './jobseeker-dashboard/jobseeker-dashboard.component';
import { JobsSearchComponent } from './jobs-search/jobs-search.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

export const routes: Routes = [
  // Public Routes
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },

  {
    path: 'job-search',
    component: JobsSearchComponent
  },

  // Protected Routes with authGuard and roleGuard
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard], // Only authenticated users with 'admin' role
    data: { role: 'admin' },
  },
  {
    path: 'recruiters-dashboard',
    component: RecruitersDashboardComponent,
    canActivate: [authGuard, roleGuard], // Only authenticated users with 'recruiter' role
    data: { role: 'recruiter' },
  },
  {
    path: 'create-jobs',
    component: CreateJobsComponent,
    canActivate: [authGuard, roleGuard], // Only authenticated users with 'recruiter' role
    data: { role: 'recruiter' },
  },
  {
    path: 'jobseeker-dashboard',
    component: JobseekerDashboardComponent,
    canActivate: [authGuard], // Only authenticated users can access
  },
  {
    path: 'job-application',
    component: JobApplicationComponent,
    canActivate: [authGuard], // Only authenticated users can access
  },
  {
    path: 'edit-profile',
    component: ProfileEditorComponent,
    canActivate: [authGuard], // Only authenticated users can access
  },

  {
    path: 'profile-viewer',
    component: ProfileViewerComponent,
    canActivate: [authGuard], // Only authenticated users can access
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard], // Only authenticated users can access
  },

  // Unauthorized Route (for users who don’t have access)
  {
    path: 'unauthorized',
    component: LandingPageComponent,
  },

  // Redirect for undefined routes (can be customized as needed)
  {
    path: '**',
    redirectTo: '/landing-page',
  },
];
