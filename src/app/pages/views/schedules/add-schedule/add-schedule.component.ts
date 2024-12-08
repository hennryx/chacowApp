import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { Subjects } from '../../../../models/subjects';
import { Teacher } from '../../../../models/teacher1';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Batch } from '../../../../models/batch';

@Component({
  selector: 'Add-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.css'
})

export class AddScheduleComponent implements OnInit, OnChanges {
    loading: Boolean = false;
    @Input() isEditModalOpen: boolean = false;
    @Input() isFormModalOpen: boolean = false;
    @Input() editSchedule: any = {};
    @Output() _closeModal = new EventEmitter<boolean>()
    @Output() _updateSchedule = new EventEmitter<void>()

    scheduleForm = new FormGroup({
        subjectid: new FormControl(0, [Validators.required]),
        teacherid: new FormControl(0, [Validators.required]),
        TimeStart: new FormControl('', [Validators.required]),
        TimeEnd: new FormControl('', [Validators.required]),
        every: new FormControl(''),
        batchid: new FormControl(0, [Validators.required]), 
    });

    everyArray: string[] = []
    subjects: Subjects[] = []
    teachers: Teacher[] = []
    batches: Batch[] = [];
    @ViewChildren('checkbox') checkboxes!: QueryList<any>;


    constructor(private restApi: RestApiService, private messageService: MessageService) {}
    ngOnChanges(changes: SimpleChanges): void {
        if(this.isEditModalOpen) {
            this.scheduleForm.patchValue({
                subjectid: this.editSchedule.subject.id,
                teacherid: this.editSchedule.teacher.id,
                TimeStart: this.editSchedule.start,
                TimeEnd: this.editSchedule.end,
                every: this.editSchedule.every,
                batchid: this.editSchedule.batch?.id,
            })
        }
    }

    async ngOnInit(): Promise<void> {
        console.log("rub");
        
        await this.handleGetSubjects();
        await this.handleGetTeacher();
        await this.handleGetBatches();
    }
    async handleGetBatches() {
        await this.restApi.get<Batch[]>('batch/all').subscribe({
            next: (response) => {
                if (response.length > 0) {
                    this.batches = response.filter(batch => batch.status !== 'disabled');
                    if (this.batches.length > 0) {
                        this.scheduleForm.patchValue({
                            batchid: this.batches[0].id 
                        });
                    }
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    
    saveSchedule(event: Event) {
        event.preventDefault()

        this.loading = true;
        if(this.isEditModalOpen) {
            const name = "schedule/update" 
            const data = {
                id: this.editSchedule.id,
                teacherid: this.scheduleForm.value.teacherid,
                subjectid: this.scheduleForm.value.subjectid,
                start: this.scheduleForm.value.TimeStart,
                end: this.scheduleForm.value.TimeEnd,
                every: this.scheduleForm.value.every,
                batchid: this.scheduleForm.value.batchid
            }
    
            this.restApi.put(name, data).subscribe({
                next: (response) => {
                    this.loading = false;
                    this._updateSchedule.emit()
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });
                    this.resetModal()
                    this.closeModal()
                },
                error: (err) => {
                    console.log(err);
                    this.loading = false;
    
                }
            })
            return
        }

        const name = "schedule/add" 
        const data = {
            teacherid: this.scheduleForm.value.teacherid,
            subjectid: this.scheduleForm.value.subjectid,
            start: this.scheduleForm.value.TimeStart,
            end: this.scheduleForm.value.TimeEnd,
            every: this.scheduleForm.value.every,
            batchid: this.scheduleForm.value.batchid,
        }

        this.restApi.post(name, data).subscribe({
            next: (response) => {
                this.loading = false;
                this._updateSchedule.emit()
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Added!' });
                this.resetModal()
                this.closeModal()
            },
            error: (err) => {
                console.log(err);
                this.loading = false;
            }
        })
    }

    closeModal() {
        this.resetModal()
        this._closeModal.emit(false)
    }

    async handleGetSubjects() {
        await this.restApi.get<Subjects[]>('subject/all').subscribe({
            next: (response) => {
                if(response.length > 0) {
                    this.subjects = response;
                    this.scheduleForm.patchValue({
                        subjectid: response[0].id
                    })
                }
                
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    async handleGetTeacher() {
        await this.restApi.get<Teacher[]>('teacher/table/all/1').subscribe({
            next: (response) => {
                if(response.length > 0) {
                    this.teachers = response;
                    this.scheduleForm.patchValue({
                        teacherid: response[0].id
                    })
                }
                
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    resetModal() {
        this.scheduleForm.reset({
            subjectid:  this.subjects[0].id,
            teacherid: this.teachers[0].id, 
            TimeStart: '',
            TimeEnd: '',
            batchid: this.batches[0]?.id 
        });
    }
}
