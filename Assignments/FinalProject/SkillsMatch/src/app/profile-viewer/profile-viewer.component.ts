import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from '../services/user.service';
import { RecruiterService } from '../services/recruiter.service';
import { AuthServicesService } from '../auth-services.service';

interface ProfileData {
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  bio?: string;
  linkedinUrl?: string;
  experienceLevel?: string;
  skills?: Array<{
    skillName: string;
    yearsExperience: string | null;
    aiCertified: boolean;
  }>;
  projects?: Array<{
    title: string;
    description: string;
    skillsUsed: string | null;
    projectUrl: string;
    role: string | null;
    teamSize: number | null;
    isCurrent: boolean | null;
  }>;
  position?: string;
  company?: string;
  specialization?: string;
  rating?: string;
  hires?: number;
  hiringVolume?: number;
  averageTimeToHire?: number;
}

@Component({
  selector: 'app-profile-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <!-- Common Profile Info -->
      <div class="personal-info">
        <h2>Personal Info</h2>
        <img src="assets/default-avatar.png" alt="avatar" class="profile-avatar">
        <p>Name: {{ profileData.firstName }} {{ profileData.lastName }}</p>
        <p>Location: {{ profileData.location || 'Not specified' }}</p>
        <p>LinkedIn: <a [href]="profileData.linkedinUrl" target="_blank">{{ profileData.linkedinUrl || 'Not provided' }}</a></p>
        
        <!-- Recruiter Specific Info -->
        <div *ngIf="isRecruiter">
          <p>Company: {{ profileData.company || 'Not specified' }}</p>
          <p>Position: {{ profileData.position || 'Not specified' }}</p>
        </div>

        <!-- Job Seeker Specific Info -->
        <div *ngIf="!isRecruiter">
          <p>Phone: {{ profileData.phone || 'Not provided' }}</p>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="skills-section" *ngIf="profileData.skills?.length">
        <h2>Skills</h2>
        <div class="skills-grid">
          <div class="skill-item" *ngFor="let skill of profileData.skills">
            <span class="skill-name">{{ skill.skillName }}</span>
            <span class="skill-level">Years: {{ skill.yearsExperience || 'N/A' }}</span>
            <span class="skill-certified">AI Certified: {{ skill.aiCertified ? 'Yes' : 'No' }}</span>
          </div>
        </div>
      </div>

      <!-- Projects Section (Job Seeker Only) -->
      <div class="projects-section" *ngIf="!isRecruiter && profileData.projects?.length">
        <h2>Projects</h2>
        <div class="projects-grid">
          <div class="project-card" *ngFor="let project of profileData.projects">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Bio Section -->
      <div class="bio-section" *ngIf="profileData.bio">
        <h2>About</h2>
        <p class="bio">{{ profileData.bio }}</p>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <h2>{{ isRecruiter ? 'Recruitment Overview' : 'Applications Overview' }}</h2>
        <div class="stats-grid">
          <div class="stat-card" *ngIf="isRecruiter">
            <div class="stat-number">{{ profileData.hires || 0 }}</div>
            <div class="stat-label">Hires</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ profileData.hiringVolume || 0 }}</div>
            <div class="stat-label">Hiring Volume</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ profileData.averageTimeToHire || 0 }}</div>
            <div class="stat-label">Average Time to Hire</div>
          </div>
        </div>
      </div>

      <!-- Interview Scheduling (Recruiter Only) -->
      <div *ngIf="isRecruiter" class="interview-section">
        <button class="schedule-button" (click)="openModal()">Schedule Interview</button>
        
        <!-- Interview Modal -->
        <div class="modal-overlay" *ngIf="isModalVisible">
          <div class="modal-content">
            <span class="close" (click)="closeModal()">&times;</span>
            <h2>Schedule Interview</h2>
            <form (ngSubmit)="scheduleInterview()">
              <div class="form-group">
                <label for="candidateName">Candidate Name:</label>
                <input type="text" id="candidateName" [(ngModel)]="interviewDetails.candidateName" name="candidateName" required />
              </div>
              <div class="form-group">
                <label for="interviewDate">Interview Date:</label>
                <input type="date" id="interviewDate" [(ngModel)]="interviewDetails.interviewDate" name="interviewDate" required />
              </div>
              <div class="form-group">
                <label for="interviewTime">Interview Time:</label>
                <input type="time" id="interviewTime" [(ngModel)]="interviewDetails.interviewTime" name="interviewTime" required />
              </div>
              <div class="form-group">
                <label for="interviewType">Interview Type:</label>
                <select id="interviewType" [(ngModel)]="interviewDetails.interviewType" name="interviewType" required>
                  <option value="In-person">In-person</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <button type="submit">Schedule</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .personal-info {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 1rem;
      object-fit: cover;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .skill-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      word-wrap: break-word;
    }
    .skill-name {
      font-weight: bold;
      color: #333;
    }
    .skill-level, .skill-certified {
      color: #666;
      font-size: 0.9rem;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .project-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-left: 4px solid #007bff;
    }
    .project-card h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .project-card p {
      margin: 0;
      color: #666;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .bio-section {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 2rem 0;
    }
    .bio {
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.6;
      color: #666;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 0.5rem;
    }
    .stat-label {
      color: #666;
      font-size: 0.9rem;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      position: relative;
    }
    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .schedule-button {
      background: #007bff;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    .schedule-button:hover {
      background: #0056b3;
    }
    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }
      .skills-grid,
      .projects-grid,
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileViewerComponent implements OnInit {
  profileData: ProfileData = {};
  isRecruiter: boolean = false;
  isModalVisible: boolean = false;
  interviewDetails: any = {
    candidateName: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: 'In-person'
  };

  constructor(
    private profileService: UserService,
    private router: Router,
    private recruiterService: RecruiterService,
    private authService: AuthServicesService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUserInfo();
    this.isRecruiter = currentUser?.user_type === 'recruiter';

    this.profileService.profileComplete().subscribe({
      next: (res: any) => {
        if (!res.profileComplete) {
          this.router.navigate([this.isRecruiter ? '/edit-recruiter-profile' : '/edit-profile']);
        } else {
          this.loadProfileData();
        }
      },
      error: (err) => {
        console.error('Error checking profile completion:', err);
        this.router.navigate([this.isRecruiter ? '/edit-recruiter-profile' : '/edit-profile']);
      }
    });
  }

  private loadProfileData(): void {
    this.profileService.getCurrentUserProfile().subscribe({
      next: (data: ProfileData) => {
        this.profileData = data;
        this.isRecruiter = data.role === 'recruiter';
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        alert('Error loading profile data. Please try again.');
      }
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  scheduleInterview(): void {
    // Implement interview scheduling logic here
    console.log('Scheduling interview:', this.interviewDetails);
    this.closeModal();
  }
}

