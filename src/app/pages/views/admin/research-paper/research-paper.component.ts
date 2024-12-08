import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { RestApiService } from '../../../../services/api/rest-api.service';

@Component({
  selector: 'app-research-paper',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './research-paper.component.html',
  styleUrl: './research-paper.component.css',
})
export class ResearchPaperComponent implements OnInit {
  filteredResearch: any = [];
  selectedResearch: any = null;
  isEditModalOpen: boolean = false;
  isFormModalOpen: boolean = false;

  constructor(private restApi: RestApiService) {}
  ngOnInit(): void {
    this.handleGetResearch();
  }

  openEditModal(research: any) {
    this.isEditModalOpen = true;
    this.selectedResearch = research;
  }

  deleteAction(id: number) {
    fetch(`http://localhost:3000/api/v1/paper/delete/${id}`, {
      method: 'delete',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  handleFormModal() {
    this.isFormModalOpen = !this.isFormModalOpen;
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
