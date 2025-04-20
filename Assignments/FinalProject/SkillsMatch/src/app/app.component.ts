import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthServicesService } from './auth-services.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SkillsMatch';
  user: any


  constructor(private router: Router, private authService:AuthServicesService) {}
  loginRedirect() {
    this.router.navigate(['login'])
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.clearUserInfo();
      this.router.navigate(['/login']);
      this.user = null;
    });
  }

  ngOnInit() {
    const currentUser = this.authService.getUserInfo();
    if (currentUser) {
      this.user = currentUser;
    } else {
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
      });
    }
  }

}
