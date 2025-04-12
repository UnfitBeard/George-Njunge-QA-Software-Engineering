import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-jobs-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './jobs-search.component.html',
  styleUrls: ['./jobs-search.component.css']
})
export class JobsSearchComponent {
  isLoggedIn: boolean = false;
  jobSearchForm: FormGroup;
  aiQuery = '';
  showModal = false;
  selectedJob: any = null;


//Job details Modal Functionalities
  openJobDetailsModal(job: any): void {
    this.selectedJob = job;
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = ''; // Re-enable scrolling
    this.selectedJob = null;
  }

  onApply(job: any): void {
    this.router.navigate(['job-application'])
    console.log('Applying to:', job.title);
    this.closeModal();
  }

  onSave(job: any): void {
    console.log('Saving job:', job.title);
  }


  experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Executive'];
  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  recommendedJobs = [
    {
      id: 1,
      title: 'Senior Angular Developer',
      company: 'Tech Innovators Inc.',
      salary: 120000,
      location: 'Remote',
      type: 'Full-time',
      matchScore: 92,
      skills: ['Angular', 'TypeScript', 'RxJS']
    },
    {
      id: 2,
      title: 'Frontend Engineer (React)',
      company: 'Digital Creations',
      salary: 110000,
      location: 'New York, NY',
      type: 'Full-time',
      matchScore: 85,
      skills: ['React', 'JavaScript', 'CSS']
    }
  ];

  filteredJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Web Solutions LLC',
      salary: 95000,
      location: 'Boston, MA',
      type: 'Full-time',
      matchScore: 88,
      skills: ['JavaScript', 'Node.js', 'React']
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'Data Systems Co.',
      salary: 105000,
      location: 'Remote',
      type: 'Contract',
      matchScore: 76,
      skills: ['Python', 'Django', 'AWS']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Minds',
      salary: 85000,
      location: 'San Francisco, CA',
      type: 'Full-time',
      matchScore: 65,
      skills: ['Figma', 'Sketch', 'User Research']
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.jobSearchForm = this.fb.group({
      searchTerm: ['', Validators.required],
      salaryRange: [80000, Validators.required],
      experience: ['Mid Level', Validators.required],
      location: ['', Validators.required],
      jobType: ['Full-time', Validators.required]
    });
  }

  onSearch() {
    if (this.jobSearchForm) {
      console.log('Search filters:', this.jobSearchForm.value);
      // Implement actual search logic here
      this.filterJobs();
    }
  }

  askAI() {
    if (this.aiQuery.trim()) {
      console.log('AI query:', this.aiQuery);
      // Implement AI search logic here
    }
  }

  filterJobs() {
    // Implement filtering based on form values
    const filters = this.jobSearchForm.value;
    this.filteredJobs = this.filteredJobs.filter(job => {
      return (
        (!filters.searchTerm || job.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
        job.salary >= filters.salaryRange &&
        (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.jobType || job.type === filters.jobType)
      );
    });
  }
}
