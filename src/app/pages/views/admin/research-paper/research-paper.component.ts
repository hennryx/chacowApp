import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "./modal/modal.component";
import { RestApiService } from '../../../../services/api/rest-api.service';

@Component({
    selector: 'app-research-paper',
    standalone: true,
    imports: [CommonModule, FormsModule, ModalComponent],
    templateUrl: './research-paper.component.html',
    styleUrl: './research-paper.component.css'
})
export class ResearchPaperComponent implements OnInit {
    filteredResearch: any = [];
    selectedResearch: any = null;
    isEditModalOpen: boolean = false;
    isFormModalOpen: boolean = false;


    constructor(private restApi: RestApiService) { }
    ngOnInit(): void {
        this.handleGetResearch();
    }

    openEditModal(research: any) {
        this.isEditModalOpen = true;
    }

    deleteAction(id: number) {

    }

    handleFormModal() {
        this.isFormModalOpen = !this.isFormModalOpen;
    }

    handleGetResearch() {
        /* this.restApi.get('').subscribe({
          next: (response) => {
              this.filteredResearch = response;
              console.log(response);
          },
          error: (err) => {
              console.error('get Research failed:', err);
          }
      }); */
    }

}
