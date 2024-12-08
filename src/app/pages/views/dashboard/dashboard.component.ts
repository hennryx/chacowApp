import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramComponent } from '../../../components/program/program.component';
import { TableLoadingComponent } from '../../../components/table-loading/table-loading.component';
import { Department } from '../../../models/department';
import { Subjects } from '../../../models/subjects';
import { RestApiService } from '../../../services/api/rest-api.service';
import { AddSubjectComponent } from '../subjects/add-subject/add-subject.component';
import { Teacher } from '../../../models/teacher1';
import { Schedule } from '../../../models/schedules';
import { TableComponent } from "../../../components/table/table.component";
import { MessageService } from 'primeng/api';

interface ExtendedSUbjects extends Subjects {
    department: Department
}

interface ModifiedSubjects extends Schedule {
    subject: ExtendedSUbjects;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule, CommonModule, TableComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    programs: Department[] = [];
    schedules: ModifiedSubjects[] = [];
    teachers: Teacher[] = [];
    filteredSchedules: any = [];

    schedulesHeader = ['#', 'Subject', 'Time start', 'Time end', 'Actions'];

    constructor(private restApi: RestApiService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.handleGetDepartment()
        this.loadTeachers()
        this.getSchedules()
    }

    handleGetDepartment() {
        const name = 'department/all'
        this.restApi.get<Department[]>(name).subscribe({
            next: (response) => {
                this.programs = response;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    loadTeachers(): void {
        const name = "teacher/table/all/1"
        this.restApi.get<Teacher[]>(name).subscribe({
            next: (response) => {
                this.teachers = response;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }


    getSchedules() {
        const name = 'schedule/all'
        this.restApi.get<ModifiedSubjects[]>(name).subscribe({
            next: (response) => {
                this.schedules = response;
                this.filterSchedules()
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    filterSchedules() {
        const currentDay = new Date().getDay();
        const dayMap: { [key: string]: number } = {
            'Sunday': 0,
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday': 6
        };
        let _filteredSchedules = this.schedules.filter(schedule => {
            return dayMap[schedule.every] === currentDay;
        });

        this.filteredSchedules = _filteredSchedules.map((schedule, index) => ({
            '#' : index +1,
            id: Number(schedule.id),
            'Subject': schedule.subject.subjectname,
            'Time start': schedule.start,
            'Time end': schedule.end,
            actions: [
                { success: 'present' },
                { danger: 'absent' }
            ],
            hasAction: true,
        }));

        console.log(_filteredSchedules);

    }

    handleAttendanceActions(value: any) {
        const data = {
            status: value.action === 'present' ? true : false,
            scheduleid: value.id
        }

        this.restApi.post('attendance/add', data).subscribe({
            next: (response) => {
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });

            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
