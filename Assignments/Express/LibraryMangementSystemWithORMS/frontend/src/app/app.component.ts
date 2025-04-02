import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BooksService } from './books.service';

const routes: Routes = [
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];
@Component({
  selector: 'app-root',
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [AuthService, BooksService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';
}
