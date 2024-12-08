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
        subjectcode: '',
        subjectname: '',
        description: '',
        departmentid: 0,
        title: '',
        type: '',
        dateStarted: '',
        dateCompleted: '',
        publicationCompleted: '',
        journal: '',
        volumeNumber: '',
        issue: '',
        issn: '',
        doi: '',
        url: '',
        keywords: '',
        taggedUsers: '',
    }
    @Input() isEditModalOpen: boolean = false
    @Output() _closeModal = new EventEmitter<boolean>()
    @Output() getDocuments = new EventEmitter<void>()

    constructor(private restApi: RestApiService) {}

    documentsForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        dateStarted: new FormControl('', [Validators.required]),
        dateCompleted: new FormControl(''),
        publicationCompleted: new FormControl(''),
        journal: new FormControl('', [Validators.required]),
        volumeNumber: new FormControl('', [Validators.required]),
        issue: new FormControl('', [Validators.required]),
        issn: new FormControl('', [Validators.required]),
        doi: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required]),
        keywords: new FormControl('', [Validators.required]),
        taggedUsers: new FormControl(''),
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isEditModalOpen) {
            this.documentsForm.patchValue({
                title: this.editDocuments.title,
                type: this.editDocuments.type,
                dateStarted: this.editDocuments.dateStarted,
                dateCompleted: this.editDocuments.dateCompleted,
                publicationCompleted: this.editDocuments.publicationCompleted,
                journal: this.editDocuments.journal,
                volumeNumber: this.editDocuments.volumeNumber,
                issue: this.editDocuments.issue,
                issn: this.editDocuments.issn,
                doi: this.editDocuments.doi,
                url: this.editDocuments.url,
                keywords: this.editDocuments.keywords,
                taggedUsers: this.editDocuments.taggedUsers,
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
