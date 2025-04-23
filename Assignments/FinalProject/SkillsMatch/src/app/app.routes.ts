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
import { RecruitersProfileEditorComponent } from './recruiters-profile-editor/recruiters-profile-editor.component';
import { ChatComponent } from './chat/chat.component';
import { LearningPathComponent } from './learning-path/learning-path.component';

export const routes: Routes = [
  // Default route
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full'
  },
  
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
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
  },
  {
    path: 'recruiters-dashboard',
    component: RecruitersDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'recruiter' },
  },
  {
    path: 'create-jobs',
    component: CreateJobsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'recruiter' },
  },
  {
    path: 'jobseeker-dashboard',
    component: JobseekerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'job-application',
    component: JobApplicationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-profile',
    component: ProfileEditorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-recruiter-profile',
    component: RecruitersProfileEditorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile-viewer',
    component: ProfileViewerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [authGuard],
  },
  {
    path: 'learning-path',
    component: LearningPathComponent,
    canActivate: [authGuard]
  },

  // Unauthorized Route
  {
    path: 'unauthorized',
    component: LandingPageComponent,
  },

  // Catch-all route
  {
    path: '**',
    redirectTo: '/landing-page',
  },
];
