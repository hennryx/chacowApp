import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { Department } from '../../../../models/department';
import { Teacher } from '../../../../models/teacher1';
import { ProgramComponent } from "../../../../components/program/program.component";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'Add-teacher',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, ProgramComponent, ButtonModule],
    templateUrl: './add-teacher.component.html',
    styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnChanges {
    loading: boolean = false;
    @Input() isFormModalOpen: boolean = false;
    @Input() isEditModalOpen: boolean = false;
    @Input() editTeacher: Teacher = {
        id: 0,
        firstname: '',
        middlename: '',
        lastname: '',
        department: {
            id: 0,
            label: '',
            depname: ''
        },
        departmentid: 0
    };
    @Output() _closeModal = new EventEmitter<boolean>();
    @Output() teacherUpdated = new EventEmitter<void>();

    selectedDepartmentid: number = 0;
    programs: Department[] = [];
    teacherForm = new FormGroup({
        fName: new FormControl('', [Validators.required]),
        lName: new FormControl('', [Validators.required]),
        mName: new FormControl(''),
    })
    updateProgram: number = 0;

    constructor(private apiService: RestApiService, private messageService: MessageService) { }

    ngOnChanges(): void {
        if (this.isEditModalOpen) {
            this.teacherForm.patchValue({
                fName: this.editTeacher.firstname,
                lName: this.editTeacher.lastname,
                mName: this.editTeacher.middlename,
            })

            this.updateProgram = this.editTeacher.department?.id;
        }
    }

    closeModal() {
        this.updateProgram = 0;
        this._closeModal.emit(false)
    }

    handleSubmit(event: Event) {
        event.preventDefault()
        this.loading = true;

        const data: { firstname: string | null | undefined, middlename: string | null | undefined, lastname: string | null | undefined, departmentid: number | null | undefined, id?: number } = {
            firstname: this.teacherForm.value.fName,
            middlename: this.teacherForm.value.mName,
            lastname: this.teacherForm.value.lName,
            departmentid: this.selectedDepartmentid,
        }

        if (this.isEditModalOpen) {
            const name = "teacher/update";
            data.id = this.editTeacher.id

            this.apiService.put(name, data).subscribe({
                next: (response) => {
                    console.log(response);
                    this.loading = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });
                    this.teacherUpdated.emit();
                    this.resetForm();
                    this.closeModal();
                },
                error: (err) => {
                    console.log(err);
                    this.loading = false;
                }
            })

            return
        }

        const name = "teacher/add"
        this.apiService.post(name, data).subscribe({
            next: (response) => {
                console.log(response);
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Added!' });
                this.teacherUpdated.emit();
                this.resetForm();
                this.closeModal();
            },
            error: (err) => {
                console.log(err);
                this.loading = false;
            }
        })
    }

    resetForm() {
        this.teacherForm.reset({
            fName: '',
            lName: '',
            mName: '',
        });
    }


    getDepartment(value: Department) {
        this.selectedDepartmentid = value.id;
    }
}
