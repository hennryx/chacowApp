import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Department } from '../../../models/department';
import { RestApiService } from '../../../services/api/rest-api.service';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { Batch } from '../../../models/batch';
import { CommonModule } from '@angular/common';
import { AddBatchComponent } from './add-batch/add-batch.component';

@Component({
  selector: 'app-batch',
  standalone: true,
  imports: [SearchbarComponent, AddBatchComponent,CommonModule],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent {
  breedcrumb : string = "List";
  programs: Department[] = [];
  batches : Batch[] = [];

  editBatch: Batch = {
      id: 0,
      batchname: '',
      createdat: '',
      status: '',
      };
 

  selectedBatch : Batch | null = null;

  filteredBatches = this.batches;
  isLogin: boolean = false;
  isFormModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDropdownOpen: boolean = false;
  isdepartmentModalOpen: boolean = false;
  isToggleActionsOpen: boolean = false;

  constructor(private apiService: RestApiService ,private messageService: MessageService,  private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
      this.loadBatches();
  }

  loadBatches(): void {
    const name = "batch/all";
    this.apiService.get<Batch[]>(name).subscribe({
        next: (response) => {
            this.batches = response; 
            this.filteredBatches = [...this.batches];
        },
        error: (err) => {
            console.error('Error loading batches:', err);
        }
    });
}
  deleteBatch(batch: Batch) {
    console.log(batch);
  
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${batch.batchname}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const apiEndpoint = `batch/delete/${batch.id}`;
        this.apiService.delete(apiEndpoint).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully deleted!',
            });
            this.isToggleActionsOpen = false;
  
            // Reload batches and log the updated list
            this.loadBatches(); 
            console.log('Fetching updated batches...');
            this.apiService.get<Batch[]>('batch/all').subscribe({
              next: (updatedBatches) => {
                console.log('Updated Batches:', updatedBatches); // Log the updated batch list
              },
              error: (err) => {
                console.error('Error fetching updated batches:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error deleting batch:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error deleting batch!',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Batch deletion cancelled!',
        });
      },
    });
  }
  
  
  onBatchUpdated() {
      console.log("im loaded");
      
      this.loadBatches();
  }
  deactivate(batch: Batch): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to disable ${batch.batchname} ?`,
      header: 'Confirm disabling',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const apiEndpoint = `batch/update`;
        const data = { ...batch, status: 'disabled' }; // Update batch with new status
  
        this.apiService.put(apiEndpoint,data).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully disabled!',
            });
            this.loadBatches(); 
            this.isToggleActionsOpen = false; 
          },
          error: (err) => {
            console.error('Error deleting batch:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error disabled batch!',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Batch disabling cancelled!',
        });
      },
    });
  }

  toggleActions(batch: Batch) {
    if (this.selectedBatch?.id === batch.id && this.isToggleActionsOpen) {
        this.isToggleActionsOpen = false;
        this.selectedBatch = null;
    } else {
        this.isToggleActionsOpen = true;
        this.selectedBatch = batch;
    }
}

  openFormModal() {
      this.breedcrumb = "Add Batch";
      this.isFormModalOpen = true;
      this.isEditModalOpen = false;
  }

  openEditModal(batch: any) {
      this.breedcrumb = "Edit Batch";
      this.isEditModalOpen = true;
      this.isFormModalOpen = false;
      this.selectedBatch = batch;
      console.log(batch);
      
      this.editBatch = { ...batch };
  }

  closeModal(value: boolean) {
      this.breedcrumb = "Today";
      this.isFormModalOpen = value;
      this.isEditModalOpen = value;
      this.selectedBatch = null;
      this.isdepartmentModalOpen = value;
  }
  
  filterByProgram() {
      if (this.selectedBatch) {
          this.filteredBatches = this.batches.filter(batch =>batch.id === this.selectedBatch?.id);
      } else {
          this.filteredBatches = this.batches;
      }
  }
}
