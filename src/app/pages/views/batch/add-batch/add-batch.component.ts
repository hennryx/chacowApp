import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { Batch } from '../../../../models/batch';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgramComponent } from '../../../../components/program/program.component';

@Component({
  selector: 'Add-batch',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProgramComponent, ButtonModule],
  templateUrl: './add-batch.component.html',
  styleUrl: './add-batch.component.css'
})
export class AddBatchComponent implements OnInit {
  loading: boolean = false;
    @Input() isFormModalOpen: boolean = false;
    @Input() isEditModalOpen: boolean = false;
    @Input() editBatch: Batch = {
        id: 0,
        batchname: '',
        createdat: '',
        status: '',
    };
    @Output() _closeModal = new EventEmitter<boolean>();
    @Output() batchUpdated = new EventEmitter<void>();
    years: string[] = [];
    selectedBatch: number = 0;
    BatchForm = new FormGroup({
        batchname: new FormControl('', [Validators.required])
    })

    constructor(private apiService: RestApiService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.generateYears();
  }

    ngOnChanges(): void {
        if (this.isEditModalOpen) {
            this.BatchForm.patchValue({
                batchname: this.editBatch.batchname,
            })
        }
    }

    closeModal() {
        this.selectedBatch = 0;
        this._closeModal.emit(false)
    }

    handleSubmit(event: Event) {
        event.preventDefault()
        this.loading = true;

        const data: { batchname: string | null | undefined,status: string | null | undefined, id?: number } = {
            batchname: this.BatchForm.value.batchname, status: "active"
        }

        if (this.isEditModalOpen) {
            const name = "batch/update";
            data.id = this.editBatch.id

            this.apiService.put(name, data).subscribe({
                next: (response) => {
                    console.log(response);
                    this.loading = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated!' });
                    this.batchUpdated.emit();
                    this.resetForm();
                    this.closeModal();
                },
                error: (err) => {
                    console.log(err);
                    this.loading = false;
                }
            })

            return
        }
        

        const name = "batch/add"
        this.apiService.post(name, data).subscribe({
            next: (response) => {
                console.log(response);
                this.loading = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Added!' });
                this.batchUpdated.emit();
                this.resetForm();
                this.closeModal();
            },
            error: (err) => {
                console.log(err);
                this.loading = false;
            }
        })
    }

    resetForm() {
        this.BatchForm.reset({
            batchname: '',
        });
    }
    


    
    generateYears(): void {
      const currentYear = new Date().getFullYear();
      const numberOfYears = 10; // Define how many years you want to display
      for (let i = 0; i < numberOfYears; i++) {
        const nextYear = currentYear + i;
        this.years.push(`${nextYear}-${nextYear + 1}`);
      }
    }
}
