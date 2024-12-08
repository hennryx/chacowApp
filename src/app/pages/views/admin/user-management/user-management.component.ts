import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "./modal/modal.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../services/api/rest-api.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [ModalComponent, FormsModule, CommonModule],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
    isEditModalOpen: boolean = false;
    selectedUser: any = {};
    users: any = []

    constructor(private restApi: RestApiService) {}
    ngOnInit(): void {
        this.getUsers();
    }

    handleFormModal() {
        this.isEditModalOpen = !this.isEditModalOpen;
    }

    openEditModal(user: any) {

    }

    getUsers() {
        this.restApi.getWithQuery('user/all', { name: "admin" }).subscribe(response => {
            console.log(response);
          });
    }
}
