import { LeaveRequestStatus } from "../enums/leave-request-status";

export interface LeaveRequest {
    ID?: number,
    Employee_ID: number,
    Absence_Reason: string,
    Start_Date: string | Date,
    End_Date: string | Date,
    Comment: string,
    Status: LeaveRequestStatus
}