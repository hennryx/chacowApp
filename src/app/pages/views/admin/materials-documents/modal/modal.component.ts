import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';

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

    constructor(private restApi: RestApiService) {}

    documentsForm = new FormGroup({
        materialtitle: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEditModalOpen) {
            this.documentsForm.patchValue({
                materialtitle: this.editDocuments.materialtitle,
                type: this.editDocuments.type,
                description: this.editDocuments.description,
                file: this.editDocuments.file,
            })
        }
    }

    closeModal() {
        this._closeModal.emit(false)
    }

    handleSaveSubject(documents: any) {
        /* save here */
        this.restApi.post("url", documents)
    }
}
