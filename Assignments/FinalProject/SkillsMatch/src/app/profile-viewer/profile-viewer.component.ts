import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective} from 'ng2-charts'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-viewer',
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './profile-viewer.component.html',
  styleUrl: './profile-viewer.component.css'
})
export class ProfileViewerComponent {
  candidate: any;
  personalInfo: any[] = [];
  skills: string[] = [];
  bio: string = '';
  linkedInUrl:string = ''
  projects: any[] = [];
  postedJobs: any[] = [];
  candidatesApplied: any[] = [];
  offersMade: any[] = [];
  offersAccepted: any[] = [];
  lineChartData: any;
  lineChartOptions: any;
  lineChartLegend: boolean = true;
  isModalVisible: boolean = false;
  interviewDetails: any = {
    candidateName: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: 'In-person'
  };

  constructor(private profileService: UserService) {}

  ngOnInit(): void {
    this.profileService.viewProfileDetails().subscribe(
      (data) => {
        console.log(data)
        this.candidate = `${data.firstName ?? ''} ${data.lastName ?? ''}`;
        this.personalInfo = [
          { github: data.github ?? 'Not Provided', location: data.location ?? 'Unknown' }
        ];

        this.skills = data.skills.map((skill: any) =>
          `Skill ID: ${skill.skill_id}, Level: ${skill.experience_level}, Years: ${skill.years_experience ?? 'N/A'}`
        );

        this.projects = data.projects;
        this.postedJobs = data.postedJobs ?? [];
        this.candidatesApplied = data.candidatesApplied ?? [];
        this.offersMade = data.offersMade ?? [];
        this.offersAccepted = data.offersAccepted ?? [];
        this.bio = data.bio
        this.linkedInUrl = data.linkedinUrl


      },
      (error) => {
        console.error('Error fetching profile data:', error);
      }
    );
  }



  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  scheduleInterview(): void {
    console.log(this.interviewDetails);
    // Call the API to schedule the interview
  }
}

