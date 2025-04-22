import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthServicesService } from './auth-services.service';
import { Subscription } from 'rxjs';

interface User {
  user_type: string;
  email: string;
  // Add other user properties as needed
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SkillsMatch';
  user: User | null = null;
  private userSubscription: Subscription | null = null;

  constructor(
    private router: Router, 
    private authService: AuthServicesService
  ) {}

  ngOnInit() {
    // Subscribe to user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.navigateToDashboard();
      }
    });

    // Initial load
    this.loadUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private loadUser() {
    const currentUser = this.authService.getUserInfo();
    if (currentUser) {
      this.user = currentUser;
      this.navigateToDashboard();
    } else {
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.user = user;
          this.navigateToDashboard();
        },
        error: () => {
          this.user = null;
        }
      });
    }
  }

  private navigateToDashboard() {
    if (!this.user) return;

    const currentPath = this.router.url;
    if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
      switch (this.user.user_type) {
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'recruiter':
          this.router.navigate(['/recruiters-dashboard']);
          break;
        case 'job_seeker':
          this.router.navigate(['/jobseeker-dashboard']);
          break;
        default:
          this.router.navigate(['/landing-page']);
      }
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearUserInfo();
        this.user = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }

  isAdmin(): boolean {
    return this.user?.user_type === 'admin';
  }

  isRecruiter(): boolean {
    return this.user?.user_type === 'recruiter';
  }

  isJobSeeker(): boolean {
    return this.user?.user_type === 'job_seeker';
  }

  // Add debug method to check user state
  debugUserState() {
    console.log('Current User:', this.user);
    console.log('Is Admin:', this.isAdmin());
    console.log('Is Recruiter:', this.isRecruiter());
    console.log('Is Job Seeker:', this.isJobSeeker());
  }
}
