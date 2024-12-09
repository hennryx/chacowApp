import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'AddDocuments',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
    loading: Boolean = false;
    @Input() isFormModalOpen: boolean = false
    @Input() editDocuments: any = {
        id: 0,
        materialtitle: '',
        type: '',
        description: '',
        file: '',
    }
    @Input() isEditModalOpen: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()
    @Output() getDocuments = new EventEmitter<void>()

    constructor(private restApi: RestApiService, private messageService: MessageService) { }

    documentsForm = new FormGroup({
        materialtitle: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEditModalOpen) {
            this.documentsForm.patchValue({
                materialtitle: this.editDocuments.materialtitle,
                description: this.editDocuments.description,
                file: this.editDocuments.file,
            })
        }
    }

    closeModal() {
        this._closeModal.emit(false)
    }

    handleSaveSubject(documents: any) {
        const endpoint =
            'http://localhost:3000/api/v1/material/' +
            (this.editDocuments?.id ? 'update' : 'add');

        let data = this.documentsForm.value;
        
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                id: this.editDocuments?.id ? this.editDocuments?.id : undefined,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Research Successfully Added' });
                this.documentsForm.reset()
                this.closeModal();
            })
            .catch((err) => {
                console.error(err)
                this.messageService.add({ severity: 'error', summary: err.message, detail: 'Message Content' });
            });
    }
}
