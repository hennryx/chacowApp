import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { Department } from '../../../../models/department';
import { Teacher } from '../../../../models/teacher1';
import { Schedule } from '../../../../models/schedules';
import { Subjects } from '../../../../models/subjects';
import { forkJoin } from 'rxjs';
import { ScheduleComponent } from "../../../../components/schedule/schedule.component";

interface AttendanceView extends Teacher {
    attendances: [],
    department: Department,
    departmentid: number,
    schedule: Schedule[]
}

interface attendanceHistory {
    id: number,
    Subject: string,
    'Time start': string, 
    'Time end': string, 
    status?: {
        status: ''
    },
    schedule?: {
        end: string,
        start: string,
        subject: {
            subjectcode: ''
        },
    },
    createdat?: string
}

interface classesToday extends attendanceHistory {
    actions: [{success: string},
            { danger: string}
            ],
    hasAction: boolean,
}

@Component({
  selector: 'Modal',
  standalone: true,
  imports: [TableComponent, ScheduleComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent implements OnInit{
    @Input() id: number = 0;
    @Output() modalStatus = new EventEmitter<boolean>();
    
    headerClasses = ['#', 'Subject', 'Time start', 'Time end', 'Actions'];
    headerAttendance = ['#', 'Subject', 'Date', 'Time start', 'Time end', 'Status'];
    classesContent: classesToday[] = [];
    attendanceContent: attendanceHistory[]= [];
    contentBody: string = "info";
    teacher = {
        id: 0,
        firstname: "",
        middlename: "",
        lastname: "",
        department: ""
    }

    constructor(private restApi: RestApiService) {}

    ngOnInit(): void {
        this.getFullSchedule();
        this.getAttendance();
    }

    getFullSchedule() {
        this.restApi.get<AttendanceView>(`teacher/complete/${this.id}`).subscribe({
            next: (response) => {
                console.log(response);
                const { id, firstname, middlename, lastname, ...res} = response;
                this.teacher = { id, firstname, middlename, lastname, department: res.department?.depname}

                const today = this.getCurrentDay();
                const sched = response?.schedule.filter(sched => sched.every.includes(today));
                
                const subjectRequests = sched.map(subject => 
                    this.restApi.get<Subjects>(`subject/${subject.subjectid}`)
                );
    
                forkJoin(subjectRequests).subscribe({
                    next: (subjects) => {
                        const schedules = sched.map((subject, index) => ({
                            ...subject,
                            subject: subjects[index]
                        }));
                        console.log(schedules);
                        
                        this.classesContent = schedules.map((subject, index) => ({
                            '#' : index +1,
                            id: Number(subject.id),
                            'Subject': subjects[index]?.subjectname,
                            'Time start': subject.start,
                            'Time end': subject.end,
                            actions: [
                                { success: 'present' },
                                { danger: 'absent' }
                            ],
                            hasAction: true,
                        }));
                    },
                    error: (err) => {
                        console.log('Error fetching subjects:', err);
                    }
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getAttendance() {
        let page = 1;
        this.restApi.get<attendanceHistory[]>(`attendance/teacher/${this.id}/${page}`).subscribe({
            next: (response) => {
                console.log("attendance history", response);
                
                this.attendanceContent = response.map((subject, index) => ({
                    '#' : index +1,
                    id: Number(subject.id),
                    'Subject': subject.schedule?.subject?.subjectcode || 'N/A',
                    'Time start': subject.schedule?.start || 'N/A',
                    'Time end': subject.schedule?.end || 'N/A',
                    Status: subject.status ? { success: 'present' } : { danger: 'absent' } ,
                    Date: this.convertDate(subject?.createdat || "")
                }));
            },
            error: (err) => {
                console.log(err);
                
            }
        })
    }

    convertDate(dateStr: string) {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate
    }

    handleModal() {
        this.modalStatus.emit(false)
    }

    handleChangeView(value: string) {
        console.log(value);
        
        this.contentBody = value;
    }

    getCurrentDay(): string {
        const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today: Date = new Date();
        const dayIndex: number = today.getDay();
        return daysOfWeek[dayIndex];
    }

    handleAttendanceActions(value: any) {
        console.log(value);
        const data = {
            status: value.action === 'present' ? true : false,
            scheduleid: value.id
        }

        this.restApi.post('attendance/add', data).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
