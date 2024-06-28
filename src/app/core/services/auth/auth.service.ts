import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser = new BehaviorSubject<Employee | null>(null)

  constructor() { }
}
