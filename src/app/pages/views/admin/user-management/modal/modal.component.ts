import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'AddUser',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
    loading: Boolean = false;
    @Input() editUser: any = {
        id: 0,
        firstname: '',
        middlename: '',
        lastname: '',
        role: 'student',
        isAdmin: false,
        email: ''
    }
    @Input() isEditModalOpen: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()

    constructor(private restApi: RestApiService, private messageService: MessageService) { }

    userForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl(''),
        lastname: new FormControl('', [Validators.required]),
        role: new FormControl('student'),
        isAdmin: new FormControl(false),
        email: new FormControl('')
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEditModalOpen) {
            if (this.editUser.role === "admin") {
                this.userForm.patchValue({ isAdmin: true })
            }
            this.userForm.patchValue(this.editUser)
        }
    }

    closeModal() {
        this._closeModal.emit(false)
    }

    handleUpdateUser(user: any) {
        let data = this.userForm.value;
        if(data.isAdmin) {
            data.role = "admin"
        }else {
            data.role = "student"
        }

        delete data.isAdmin;

        fetch(`http://localhost:3000/api/v1/user/changerole`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Promoted Successfully' });
            })
            .catch((err) => {
                console.error(err)
                this.messageService.add({ severity: 'error', summary: err.message, detail: 'Message Content' });
            });

    }
}
