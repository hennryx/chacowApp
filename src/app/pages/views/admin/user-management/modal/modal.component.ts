import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

    constructor() { }

    userForm = new FormGroup({
        id: new FormControl(0),
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl(''),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        role: new FormControl('')
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (Object.keys(this.editUser).length > 0 && this.isEditMode) {
            this.userForm.patchValue(this.editUser)
        }
    }

    closeModal() {
        this.userForm.reset()
        this._closeModal.emit(false)
    }

    handleAddUser(event: Event) {
        event.preventDefault();

        if(!this.userForm.valid) return

        let data = this.userForm.value;
        data.role = 'student';

        const storedUserData = localStorage.getItem('users');
        let oldData = storedUserData ? JSON.parse(storedUserData) : [];

        console.log(this.editUser.id);
        const existingUser = oldData.find((item: any) => item.email === data.email);

        if (existingUser) {
            Swal.fire({
                title: "Error!",
                text: "User with this email already exists.",
                icon: "error"
            });
            return;
        }

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
        this.userForm.reset();
        this.editUser = {}
    }

}
