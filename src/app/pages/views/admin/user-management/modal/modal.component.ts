import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
    selector: 'AddUser',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
    loading: Boolean = false;
    @Input() editUser: any = {}
    @Input() isModalOpen: boolean = false
    @Input() isEditMode: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()

    constructor(private messageService: MessageService) { }

    userForm = new FormGroup({
        id: new FormControl(0),
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl(''),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('')
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (Object.keys(this.editUser).length > 0 && this.isEditMode) {
            console.log(this.editUser);
            
            this.userForm.patchValue(this.editUser)
        }
    }

    closeModal() {
        this.userForm.reset()
        this._closeModal.emit(false)
    }

    handleAddUser(event: Event) {
        event.preventDefault();
    
        let data = this.userForm.value;
        
        const storedUserData = localStorage.getItem('users');
        let oldData = storedUserData ? JSON.parse(storedUserData) : [];
        
        console.log(this.editUser.id);
        
        if (this.editUser.id !== 0 && this.isEditMode) {
            let updatedData = oldData.map((item: any) =>
                item.id === this.editUser.id ? { ...item, ...data } : item
            );
            
            localStorage.setItem('users', JSON.stringify(updatedData));
            Swal.fire({
                title: "Updated!",
                text: "user updated successfully.",
                icon: "success"
            });

        } else {
            data.id = Number(new Date().getTime())
            let updatedData = [...oldData, data];
            localStorage.setItem('users', JSON.stringify(updatedData));
            Swal.fire({
                title: "Added!",
                text: "New user has been added.",
                icon: "success"
            });
        }
        
        this.closeModal();
    }
    
}
