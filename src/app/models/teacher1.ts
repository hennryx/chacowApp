import { Department } from "./department";

//teacher.model.ts
export interface Teacher {
    id: number,
    firstname: string,
    middlename: string,
    lastname: string,
    department: Department,
    departmentid: number,
}