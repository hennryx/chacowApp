import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "./modal/modal.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [ModalComponent, FormsModule, CommonModule],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
    isModalOpen: boolean = false;
    selectedUser: any = {};
    users: any = [];
    isEditMode: boolean = false;


    constructor() { }

    ngOnInit(): void {
        this.getUsers();
    }

    handleFormModal() {
        this.isModalOpen = !this.isModalOpen;
    }

    handleCloseFormModal() {
        this.isModalOpen = !this.isModalOpen;
        this.getUsers();
    }

    openEditModal(user: any) {
        this.isModalOpen = !this.isModalOpen;
        this.selectedUser = user;
        this.isEditMode = true;
    }

    getUsers() {
        const storedUserData = localStorage.getItem('users');
        this.users = storedUserData ? JSON.parse(storedUserData) : [];
    }

    deleteUser(id: number) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = localStorage.getItem('users')
                const parseData = data ? JSON.parse(data) : []
                if (parseData.length === 0) return;
        
                const newData = parseData.filter((item: any) => item.id !== id);
                localStorage.setItem('users', JSON.stringify(newData));
                this.getUsers();

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
}
