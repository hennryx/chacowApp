import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';

@Component({
    selector: 'AddResearch',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
    loading: Boolean = false;
    @Input() isFormModalOpen: boolean = false
    @Input() editResearch: any = {
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
    @Output() getResearch = new EventEmitter<void>()

    constructor(private restApi: RestApiService) {}

    researchForm = new FormGroup({
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
            this.researchForm.patchValue({
                title: this.editResearch.title,
                type: this.editResearch.type,
                dateStarted: this.editResearch.dateStarted,
                dateCompleted: this.editResearch.dateCompleted,
                publicationCompleted: this.editResearch.publicationCompleted,
                journal: this.editResearch.journal,
                volumeNumber: this.editResearch.volumeNumber,
                issue: this.editResearch.issue,
                issn: this.editResearch.issn,
                doi: this.editResearch.doi,
                url: this.editResearch.url,
                keywords: this.editResearch.keywords,
                taggedUsers: this.editResearch.taggedUsers,
            })
        }
    }

    closeModal() {
        this._closeModal.emit(false)
    }

    handleSaveSubject(research: any) {
        /* save here */
        this.restApi.post("url", research)
    }
}
