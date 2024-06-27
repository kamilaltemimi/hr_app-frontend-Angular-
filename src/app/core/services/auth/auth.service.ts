import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Employee } from '../../models/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<Employee | null>(null)

  URL = 'http://localhost:3000/employee'

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL)
  }

  getEmployeesBySubdivision(subdivision: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/subdivision/${subdivision}`)
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.URL}/${id}`)
  }

}
