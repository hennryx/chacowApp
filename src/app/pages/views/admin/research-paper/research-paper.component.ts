import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-research-paper',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './research-paper.component.html',
  styleUrl: './research-paper.component.css',
  providers: [ConfirmationService]
})
export class ResearchPaperComponent implements OnInit {
  filteredResearch: any = [];
  selectedResearch: any = null;
  isEditModalOpen: boolean = false;
  isFormModalOpen: boolean = false;

  constructor(private restApi: RestApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.handleGetResearch();
  }

  openEditModal(research: any) {
    this.isEditModalOpen = true;
    this.selectedResearch = research;
  }

  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        fetch(`http://localhost:3000/api/v1/paper/delete/${id}`, {
          method: 'delete',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Research deleted Successfully' });
            this.handleGetResearch();
          })
          .catch((err) => {
            console.error(err)
            this.messageService.add({ severity: 'error', summary: err.message, detail: 'Message Content' });
          });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  handleFormModal() {
    this.isFormModalOpen = !this.isFormModalOpen;
  }

  handleCloseModals() {
    this.isFormModalOpen = false;
    this.isEditModalOpen = false;
    this.handleGetResearch();
  }

  handleGetResearch() {
    this.restApi.get('paper/all').subscribe({
      next: (response) => {
        this.filteredResearch = response;
        console.log(response);
      },
      error: (err) => {
        console.error('get Research failed:', err);
      },
    });
  }
}
