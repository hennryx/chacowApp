import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableLoadingComponent } from '../../../components/table-loading/table-loading.component';
import { Subjects } from '../../../models/subjects';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Department } from '../../../models/department';
import { ProgramComponent } from '../../../components/program/program.component';
import { Schedule } from '../../../models/schedules';
import { MessageService } from 'primeng/api';
import { Batch } from '../../../models/batch';

interface ExtendedSUbjects extends Subjects {
    department: Department
}

interface ExtendedBatch extends Batch {
    batch: Batch
}


interface ModifiedSubjects extends Schedule {
    subject: ExtendedSUbjects; 
    batch: ExtendedBatch
}

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [FormsModule,CommonModule,TableLoadingComponent, AddScheduleComponent, ProgramComponent],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit {
    
    schedule: any = {}
    breedcrumb: string = 'Today';
    batches: Batch[] = [];
    filteredSchedules: ModifiedSubjects[] = [];
    schedules: ModifiedSubjects[] = [];
    selectedProgram: Department = {
        id: 0,
        label: '',
        depname: ''
    };
    isloading: boolean = false;
    isLogin: boolean = true;

    isFormModalOpen: boolean = false;
    isEditModalOpen: boolean = false;
    selectedSchedule: any = null;
    isToggleActionsOpen: boolean = false;
    constructor(private restApi: RestApiService, private messageService: MessageService) {} 

    ngOnInit(): void {
        this.getSchedules()
        
    }

    getSchedules() {
        const name = 'schedule/all'
        this.restApi.get<ModifiedSubjects[]>(name).subscribe({
            next: (response) => {
                console.log(response);
                this.schedules = response;
                this.handleFilteredSchedules()
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

   

    deleteSchedule(schedule: ModifiedSubjects) {
        if (confirm(`Are you sure you want to delete the schedule for ${schedule.subject.subjectname} with teacher ${schedule.teacher.firstname} }?`)) {
            const apiEndpoint = `teacher/delete/${schedule.id}`;
            this.restApi.delete(apiEndpoint).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted Schedule!' });
                    this.getSchedules(); 
                    this.isToggleActionsOpen = false; 
                },
                error: (err) => {
                    console.error('Error deleting teacher:', err);
                    this.messageService.add({ severity: 'error', summary: 'error', detail: 'error deleting Schedule!' });
                }
            });
        }
        console.log(schedule);
    }
    
    toggleActions(schedule: ModifiedSubjects) {
        if (this.selectedSchedule?.id === schedule.id && this.isToggleActionsOpen) {
            this.isToggleActionsOpen = false;
        } else {
            this.isToggleActionsOpen = true;
            this.selectedSchedule = schedule;
        }
    }
    
    openFormModal() {
        this.breedcrumb = 'Add Schedule';
        this.isFormModalOpen = true;
        this.isEditModalOpen = false;
    }

    openEditModal(schedule: Schedule) {
        this.breedcrumb = 'Edit Schedule';
        this.isEditModalOpen = true;
        this.isFormModalOpen = false;
        this.selectedSchedule = schedule;
    }

    closeModal(value: boolean) {
        this.breedcrumb = 'Today';
        this.isFormModalOpen = value;
        this.isEditModalOpen = value;
        this.selectedSchedule = null;
    }

    handleChange() {
        this.getSchedules()
    }

    handleFilteredSchedules() {
        if(this.schedules.length > 0 && this.selectedProgram.id !== 0) {
            this.filteredSchedules = this.schedules.filter(schedule => schedule.subject.department.id === this.selectedProgram.id);
        }
    }

    filterByProgram(value: Department) {
        this.selectedProgram = value;
        this.handleFilteredSchedules()
    }
}
