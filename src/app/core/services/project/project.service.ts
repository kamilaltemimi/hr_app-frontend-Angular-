import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  URL = 'http://localhost:3000/project'

  constructor(
    private http: HttpClient
  ) { }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.URL, project)
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.URL)
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.URL}/${id}`, project)
  }
}