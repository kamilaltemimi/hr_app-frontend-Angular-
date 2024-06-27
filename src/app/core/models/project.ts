import { ProjectStatus } from "../enums/status";

export interface Project {
    ID?: number,
    Project_Type: string,
    Start_Date: string,
    End_Date: string,
    Project_Manager: number,
    Comment: string,
    Status: ProjectStatus
}