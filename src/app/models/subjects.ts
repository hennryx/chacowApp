import { Department } from "./department";

export interface Subjects {
    id: number; 
    subjectcode: string;
    subjectname: string;       
    description: string;
    departmentid: number;
}