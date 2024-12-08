import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "./modal/modal.component";

@Component({
    selector: 'app-materials-documents',
    standalone: true,
    imports: [CommonModule, FormsModule, ModalComponent],
    templateUrl: './materials-documents.component.html',
    styleUrl: './materials-documents.component.css'
})
export class MaterialsDocumentsComponent {
    filteredSchedules: any = [];
    isToggleActionsOpen: boolean = false;
    filteredMaterials: any = [];
    selectedDocument: any = null;

    isEditModalOpen: boolean = false;
    isFormModalOpen: boolean = false;

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
