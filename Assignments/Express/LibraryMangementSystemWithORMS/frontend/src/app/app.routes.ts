import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddbookComponent } from './addbook/addbook.component';
import { HomeComponent } from './home/home.component';
import { BorrowerDashboardComponent } from './borrower-dashboard/borrower-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Set your default component here
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'borrower-dashboard', component: BorrowerDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addBook', component: AddbookComponent },// Add this line // other routes
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'home' } // Wildcard route for unmatched URLs
];
