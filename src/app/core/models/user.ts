export interface User {
    ID: number,
    Full_Name: string,
    Subdivision: string,
    Position: string,
    Status: string,
    People_Partner: number,
    Out_of_Office_Balance: number,
    Photo?: File
}