import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Department } from '../../../../models/department';

@Component({
    selector: 'Add-department',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
    templateUrl: './add-department.component.html',
    styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {
    loading: boolean = false;
    @Input() isFormModalOpen: boolean = false;
    @Input() isEditModalOpen: boolean = false;
    @Input() editDepartment: Department = {   
            id: 0,
            label: '',
            depname: ''
    };
    @Output() _closeModal = new EventEmitter<boolean>();
    @Output() departmentUpdated = new EventEmitter<void>();

    selectedDepartmentid: number = 0;
    programs: Department[] = [];
    departmentForm = new FormGroup({
        label: new FormControl('', [Validators.required]),
        depname: new FormControl('', [Validators.required]),
    })
    updateProgram: number = 0;

    constructor(private apiService: RestApiService, private messageService: MessageService) { }

    ngOnChanges(): void {
        if (this.isEditModalOpen) {
            this.departmentForm.patchValue({
                label: this.editDepartment.label,
                depname: this.editDepartment.depname,
            })

            this.updateProgram = this.editDepartment.id;
        }
    }

    closeModal() {
        this.updateProgram = 0;
        this._closeModal.emit(false)
    }

    handleSubmit(event: Event) {
        event.preventDefault()
        this.loading = true;

        const data: { id?: number, label: string | null | undefined, depname: string | null | undefined, } = {
            label: this.departmentForm.value.label,
            depname: this.departmentForm.value.depname,
        }

        if (this.isEditModalOpen) {
            const name = "department/update";
            data.id = this.editDepartment.id

            this.apiService.put(name, data).subscribe({
                next: (response) => {
                    console.log(response);
                    this.loading = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });
                    this.departmentUpdated.emit();
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

        const name = "department/add"
        this.apiService.post(name, data).subscribe({
            next: (response) => {
                console.log(response);
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Added!' });
                this.departmentUpdated.emit();
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
    this.departmentForm.reset({
        label: '',
        depname: '',
    });
}

getDepartment(value: Department) {
    this.selectedDepartmentid = value.id;
}
}
