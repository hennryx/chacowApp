import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "./modal/modal.component";
import { Teacher } from '../../../models/teacher1';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Department } from '../../../models/department';
import { ProgramComponent } from "../../../components/program/program.component";
import { Schedule } from '../../../models/schedules';

interface cardSubjects extends Teacher {
    schedule: Schedule[],
    attendance: []
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [SearchbarComponent, FormsModule, CommonModule, ModalComponent, ProgramComponent],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})

export class AttendanceComponent implements OnInit{
    breadCrumb: string = "Today"
    selectedProgram: Department = {
        id: 0,
        label: '',
        depname: ''
    };
    _openModal: boolean = false;
    teachers: cardSubjects[] = [];
    teacherid: number = 0;
    filteredTeachers: cardSubjects[] = []


    constructor(private restApi: RestApiService) {} 

    ngOnInit(): void {

        this.getTeachersCard()
    }

    getTeachersCard() {
        this.restApi.get<cardSubjects[]>('teacher/card/all').subscribe({
            next: (response) => {
                this.teachers = response;
                console.log(response);
                
                this.handleGetAttendance();
            },
            error: (err) => {
                console.error('get teachers failed:', err);
            }
        });
    }

    handleGetAttendance() {
        if(this.teachers.length > 0 && this.selectedProgram.id !== 0) {
            this.filteredTeachers = this.teachers.filter((teacher) => teacher.departmentid === this.selectedProgram.id)
        }
    }

    getTotalAttendance(_id: number): number {
        if (this.filteredTeachers.length > 0) {
            const teacher = this.filteredTeachers.find((teacher) => teacher.id === _id);
            if (teacher?.schedule) {
                const count = teacher.schedule.reduce((acc, curr) => acc + (curr._count?.attendance || 0), 0);
                return count
            }
        }
        return 0;
    } 

    openModal(event: boolean) {
        this.breadCrumb = "View"
        this._openModal = event;
        if(!event) this.teacherid = 0
    }

    handleOpenModal(event: boolean, teacherId: number) {
        this.teacherid = teacherId;
        this.openModal(event);
    }

    filterByProgram(value: Department) {
        this.selectedProgram = value;
        this.handleGetAttendance();
    }
}
