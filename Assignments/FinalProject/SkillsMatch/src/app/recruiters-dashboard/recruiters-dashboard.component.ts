import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-recruiters-dashboard',
  imports:[ReactiveFormsModule,FormsModule, BaseChartDirective, CommonModule, CommonModule],
  templateUrl: './recruiters-dashboard.component.html',
  styleUrls: ['./recruiters-dashboard.component.css']
})
export class RecruitersDashboardComponent {
onEditProfile(recruiter: any) {
  this.router.navigate(['recruiter-profile-editor'],{state: {recruiterData: this.recruiter}});
}

deleteJob(jobName: { id: number; title: string; description: string; applicants: any[]; deadline: string; completion: number; status: string; }) {
  this.activeJobs = this.activeJobs.filter(job => job !== jobName)
}
  // Stats Section Data
  postedJobs = Array(8).fill({}).map((_, i) => ({
    id: i + 1,
    title: `Job ${i + 1}`,
    status: ['Open', 'Closed'][Math.floor(Math.random() * 2)]
  }));

  candidatesApplied = Array(45).fill({}).map((_, i) => ({
    id: i + 1,
    name: `Candidate ${i + 1}`,
    appliedDate: new Date(Date.now() - Math.random() * 1000000000)
  }));

  offersMade = Array(12).fill({}).map((_, i) => ({
    id: i + 1,
    candidate: `Candidate ${i + 1}`,
    position: `Position ${i % 3 + 1}`
  }));

  offersAccepted = this.offersMade.slice(0, 9);

  // Metrics
  postedJobsProgress = 75;
  candidateTrend = 8.5;
  offerAcceptanceRate = 75;
  averageHireTime = 14;
  predictedHires = 22;

  // AI Analytics Data
  candidateMatchData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Candidate Matches',
      data: [65, 59, 80, 81, 56, 72],
      backgroundColor: 'rgba(35, 137, 218, 0.5)'
    }]
  };

  hiringTrendsData: ChartConfiguration<'line'>['data'] = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Hiring Trends',
      data: [85, 92, 78, 88, 95],
      borderColor: '#ff5f6d',
      fill: false
    }]
  };

  topCandidateSkills = ['Angular', 'React', 'Node.js', 'AWS', 'Python'];

  // Recruiter Profile
  recruiter = {
    name: 'Sarah Johnson',
    firstname: 'Sarah',
    lastname: 'Johnson',
    company: 'Tech Innovators Inc.',
    avatar: 'https://via.placeholder.com/150',
    verified: true,
    rating: 4.7,
    hires: 142
  };

  // Applications Data
  applicationSearch = '';
  statusFilter = 'all';
  filteredApplications = [
    {
      id: 1,
      candidate: {
        name: 'John Carter',
        avatar: 'https://via.placeholder.com/40'
      },
      jobTitle: 'Senior Frontend Developer',
      matchScore: 92,
      status: 'new'
    },
    {
      id: 2,
      candidate: {
        name: 'Emma Wilson',
        avatar: 'https://via.placeholder.com/40'
      },
      jobTitle: 'DevOps Engineer',
      matchScore: 85,
      status: 'reviewed'
    },
    {
      id: 3,
      candidate: {
        name: 'Michael Chen',
        avatar: 'https://via.placeholder.com/40'
      },
      jobTitle: 'Full Stack Developer',
      matchScore: 88,
      status: 'hired'
    }
  ];

  // Job Management Data
  activeJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      description: 'Looking for experienced Angular developer',
      applicants: Array(15).fill({}),
      deadline: '2024-06-30',
      completion: 65,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Cloud Infrastructure Engineer',
      description: 'AWS/Azure cloud specialist needed',
      applicants: Array(8).fill({}),
      deadline: '2024-05-15',
      completion: 45,
      status: 'Active'
    },
    {
      id: 3,
      title: 'AI/ML Specialist',
      description: 'Machine learning expert with Python experience',
      applicants: Array(22).fill({}),
      deadline: '2024-07-01',
      completion: 35,
      status: 'Active'
    }
  ];

  // Schedule Interview Modal
  showScheduleModal = false;
  selectedCandidate: number | null = null;
  interviewDateTime: string = '';
  interviewType: string = 'video';
  candidates = [
    { id: 1, name: 'John Carter' },
    { id: 2, name: 'Emma Wilson' },
    { id: 3, name: 'Michael Chen' }
  ];

  //Job Editing Modal
  // Add these to your component class
showEditJobModal = false;
currentJobToEdit: any = null;
editJobForm: FormGroup;

constructor(private fb: FormBuilder, private router:Router) {
  this.editJobForm = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    description: ['', Validators.required],
    minSalary: [null, Validators.required],
    maxSalary: [null, Validators.required],
    jobType: ['Full-time', Validators.required],
    deadline: ['', Validators.required],
    location: ['', Validators.required],
    skills: ['', Validators.required]
  });
}

// Update your existing edit button to call this method
openEditJobModal(job: any) {
  this.currentJobToEdit = job;
  this.editJobForm.patchValue({
    title: job.title,
    company: job.company,
    description: job.description,
    minSalary: job.salaryRange?.min || job.salary || 0,
    maxSalary: job.salaryRange?.max || job.salary || 0,
    jobType: job.type || 'Full-time',
    deadline: this.formatDateForInput(job.deadline),
    location: job.location || '',
    skills: job.skills?.join(', ') || ''
  });
  this.showEditJobModal = true;
}

closeEditJobModal() {
  this.showEditJobModal = false;
  this.currentJobToEdit = null;
  this.editJobForm.reset();
}

saveJobChanges() {
  if (this.editJobForm.valid && this.currentJobToEdit) {
    const updatedJob = {
      ...this.currentJobToEdit,
      ...this.editJobForm.value,
      skills: this.editJobForm.value.skills.split(',').map((s: string) => s.trim()),
      salaryRange: {
        min: this.editJobForm.value.minSalary,
        max: this.editJobForm.value.maxSalary
      }
    };

    // Update the job in your array (replace with API call in real app)
    const index = this.activeJobs.findIndex(j => j.id === this.currentJobToEdit.id);
    if (index !== -1) {
      this.activeJobs[index] = updatedJob;
    }

    this.closeEditJobModal();
  }
}

private formatDateForInput(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

  // Chart Options
  barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };
  lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  // Methods
  openScheduleModal() {
    this.showScheduleModal = true;
  }

  closeScheduleModal() {
    this.showScheduleModal = false;
    this.resetForm();
  }

  scheduleInterview() {
    if (this.selectedCandidate && this.interviewDateTime) {
      const interviewDetails = {
        candidateId: this.selectedCandidate,
        datetime: this.interviewDateTime,
        type: this.interviewType
      };
      console.log('Scheduling interview:', interviewDetails);
      this.closeScheduleModal();
    }
  }

  private resetForm() {
    this.selectedCandidate = null;
    this.interviewDateTime = '';
    this.interviewType = 'video';
  }

  // Dummy action methods
  reviewCandidates() {
    console.log('Opening candidate review...');
  }

  generateReport() {
    console.log('Generating report...');
  }

  viewApplication(application: any) {
    this.router.navigate(['profile-viewer'],
      {state: {candidate: application.candidate}}
    )
    console.log('Viewing application:', application);
  }

  contactCandidate(application: any) {
    this.router.navigate(['chat'], {
      state: {candidate: application.candidate}
    })
    console.log('Contacting candidate:', application);
  }

  createNewJob() {
    console.log('Creating new job...');
    this.router.navigate(['create-jobs'])
  }

}
