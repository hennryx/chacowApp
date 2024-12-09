import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-materials-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './materials-documents.component.html',
  styleUrl: './materials-documents.component.css',
  providers: [ConfirmationService],
})
export class MaterialsDocumentsComponent implements OnInit {
  filteredSchedules: any = [];
  isToggleActionsOpen: boolean = false;
  filteredMaterials: any = [];
  selectedDocument: any = null;

  isEditModalOpen: boolean = false;
  isFormModalOpen: boolean = false;

  constructor(
    private restApi: RestApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.handleGetDocuments();
  }

  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        let documents = JSON.parse(sessionStorage.getItem('documents') || '[]');
        documents = documents.filter((x: any) => x.id != id);
        sessionStorage.setItem('documents', JSON.stringify(documents));
        this.handleGetDocuments();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  handleFormModal() {
    this.isFormModalOpen = !this.isFormModalOpen;
  }

  handleCloseModal() {
    this.isFormModalOpen = false;
    this.isEditModalOpen = false;
    this.handleGetDocuments();
  }

  deleteAction(id: number) {}

  toggleActions(item: any) {}

  openEditModal(item: any) {
    this.isFormModalOpen = true;
    this.selectedDocument = item;
  }

  handleGetDocuments() {
    this.filteredMaterials = JSON.parse(
      sessionStorage.getItem('documents') || '[]'
    );
  }
}
