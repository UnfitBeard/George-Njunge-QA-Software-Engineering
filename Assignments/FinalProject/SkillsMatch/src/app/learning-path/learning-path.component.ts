import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningPathService, LearningPath } from '../services/learning-path.service';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {
  selectedRole: string = '';
  currentPath: LearningPath | null = null;
  showPath: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  constructor(private learningPathService: LearningPathService) {}

  ngOnInit() {
    // Set default role if needed
    this.selectedRole = 'software_engineer';
  }

  onSubmit() {
    if (this.selectedRole) {
      this.loading = true;
      this.error = null;
      
      this.learningPathService.getLearningPath(this.selectedRole).subscribe({
        next: (path) => {
          this.currentPath = path;
          this.showPath = true;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching learning path:', err);
          this.error = 'Failed to load learning path. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onRoleChange() {
    this.showPath = false;
    this.currentPath = null;
    this.error = null;
  }
}
