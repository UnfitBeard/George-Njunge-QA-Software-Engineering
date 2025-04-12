import { Route, Router } from '@angular/router';
import { routes } from './../app.routes';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  candidate:any;

  constructor(private router: Router) {
    const nav = router.getCurrentNavigation();
    this.candidate = nav?.extras.state?.['candidate'];
  }
}
