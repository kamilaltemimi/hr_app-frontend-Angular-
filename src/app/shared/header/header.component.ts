import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService } from '../../core/services/auth/auth.service';
import { Employee } from '../../core/models/employee';
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

  activeUser: Employee | null = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((employee: Employee | null) => {
      this.activeUser = employee ? employee : null
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