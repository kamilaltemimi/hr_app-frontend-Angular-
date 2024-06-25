import { Status } from "../enums/leave-request-status";

export interface LeaveRequest {
    Employee_ID: number,
    Absence_Reason: string,
    Start_Date: string,
    End_Date: string,
    Comment: string,
    Status: Status
}