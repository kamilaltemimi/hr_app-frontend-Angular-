import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../../models/leave-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  URL = 'http://localhost:3000/leave-requests'

  constructor(
    private http: HttpClient) { }

  addLeaveRequest(leaveRequest: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.URL, leaveRequest)
  }

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.URL)
  }

  updateLeaveRequest(id: number, status: string): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.URL}/${id}`, status)
  }
}