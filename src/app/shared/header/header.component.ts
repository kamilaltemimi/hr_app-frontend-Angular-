import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/user';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, FlexLayoutModule, CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  activeUser: User | null = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.activeUser = user ? user : null
    })
  }

  logout(): void {
    this.authService.currentUser.next(null)
    localStorage.removeItem('user_data')
    this.router.navigate(['/auth'])
  }

  navigate(route: string): void {
    this.router.navigate([route])
  }

}
