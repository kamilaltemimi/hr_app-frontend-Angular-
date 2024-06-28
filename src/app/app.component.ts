import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    const storedData = localStorage.getItem('user_data')
    const parsedData = storedData ? JSON.parse(storedData) : null
    this.authService.currentUser.next(parsedData)
  }
}