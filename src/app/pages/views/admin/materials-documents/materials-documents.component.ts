import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "./modal/modal.component";
import { RestApiService } from '../../../../services/api/rest-api.service';

@Component({
    selector: 'app-materials-documents',
    standalone: true,
    imports: [CommonModule, FormsModule, ModalComponent],
    templateUrl: './materials-documents.component.html',
    styleUrl: './materials-documents.component.css'
})
export class MaterialsDocumentsComponent implements OnInit {
    filteredSchedules: any = [];
    isToggleActionsOpen: boolean = false;
    filteredMaterials: any = [];
    selectedDocument: any = null;

    isEditModalOpen: boolean = false;
    isFormModalOpen: boolean = false;

    constructor(private restApi: RestApiService) {}
    ngOnInit(): void {
        this.restApi.get('get-all-material').subscribe({
            next: (response) => {
                this.filteredMaterials = response;
                console.log(this.filteredMaterials);
                
            },
            error: (err) => {
                console.log(err);
            }
        })
        
    }

    handleAttendanceActions(value: any) {
        const data = {
            status: value.action === 'present' ? true : false,
            scheduleid: value.id
        }
    }

    handleFormModal() {
        this.isFormModalOpen = !this.isFormModalOpen;
    }

    deleteAction(id: number) {

    }

    toggleActions(item: any) {

    }

    openEditModal(item: any) {

    }

    handleGetDocuments() {
        
    }
}
