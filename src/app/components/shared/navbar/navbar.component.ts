import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /**
   * Creates an instance of navbar component.
   * @param auth 
   */
  constructor(private auth: AuthenticationService) {}
  /**
   * Logouts navbar component
   */
  logout(): void {
    this.auth.logout();
  }
}
