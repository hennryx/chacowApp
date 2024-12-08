import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProgramComponent } from '../../../../components/program/program.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subjects } from '../../../../models/subjects';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { Department } from '../../../../models/department';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'Add-subject',
  standalone: true,
  imports: [ProgramComponent, FormsModule, CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent implements OnChanges {
    loading: Boolean = false;
    @Input() isFormModalOpen: boolean = false
    @Input() editSubject: Subjects = {
        id: 0,
        subjectcode: '',
        subjectname: '',
        description: '',
        departmentid: 0,
    }
    @Input() isEditModalOpen: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()
    @Output() getTeacher = new EventEmitter<void>()

    subjectForm = new FormGroup({
        subjectcode: new FormControl('', [Validators.required]),
        subjectname: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });
    updateProgram: number = 0
    selectedDepartmentid: number = 0;
    constructor(private restApi: RestApiService, private messageService: MessageService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(this.editSubject) {
            this.subjectForm.patchValue(this.editSubject)
            this.updateProgram = this.editSubject.departmentid;
        }
    }

    closeModal(){
        this._closeModal.emit(false)
    }

    handleSaveSubject(event: Event) {
        event?.preventDefault();

        this.loading = true;
        if(this.subjectForm.valid) {
            let name = "subject/add"
            const data = {
                ...this.subjectForm.value,
                departmentid: this.selectedDepartmentid
            }
            
            if(this.isEditModalOpen) {
                
                name = "subject/update"
                console.log(data);
                const updateData = {
                    ...data,
                    id: this.editSubject.id
                }
                this.restApi.put(name, updateData).subscribe({
                    next: (response) => {
                        console.log(response);
                        this.loading = false;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });
                        this.resetForm();
                        this.getTeacher.emit()
                        this._closeModal.emit(false)
                    },
                    error: (err) => {
                        console.log(err);
                        this.loading = false;
                    }
                })
                return

            }

            this.restApi.post(name, data).subscribe({
                next: (response) => {
                    console.log(response);
                    this.loading = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Added!' });
                    this.resetForm();
                    this.getTeacher.emit()
                    this._closeModal.emit(false)
                },
                error: (err) => {
                    console.log(err);
                    this.loading = false;
                }
            })
        }
    }

    getDepartment(value: Department) {
        this.selectedDepartmentid = value.id;
    }

    resetForm() { 
        this.subjectForm.reset({
            subjectcode: "",
            subjectname: "",
            description: ""
        })
    }
}
