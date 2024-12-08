import { Batch } from "./batch";
import { Subjects } from "./subjects";
import { Teacher } from "./teacher1";

export interface Schedule {
    id: number
    every: string
    start: string
    end: string
    subject: Subjects;
    subjectid: number
    teacher: Teacher
    teacherid: number
    batch: Batch
    batchid: number
    _count: {
        attendance: 0
    }
  
  
}