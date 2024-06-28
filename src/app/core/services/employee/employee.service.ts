import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL = 'http://localhost:3000/employee'

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL)
  }

  getEmployeesBySubdivision(subdivision: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/subdivision/${subdivision}`)
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.URL}/${id}`)
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/${employee.ID}`, employee)
  }

  deactivateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/${employee.ID}/deactivate`, employee)
  }

  activateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/${employee.ID}/activate`, employee)
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.URL, employee)
  }
}