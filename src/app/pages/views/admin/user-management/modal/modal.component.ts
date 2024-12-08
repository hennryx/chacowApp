import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';

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
        role: false
    }
    @Input() isEditModalOpen: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()

    constructor(private restApi: RestApiService) {}

    userForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl(''),
        lastname: new FormControl('', [Validators.required]),
        role: new FormControl(false),
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEditModalOpen) {
            this.userForm.patchValue(this.editUser)
        }
    }

    closeModal() {
        this._closeModal.emit(false)
    }

    handleUpdateUser(user: any) {
        /* save here */
        this.restApi.put("user/changerole", user)
    }
}
