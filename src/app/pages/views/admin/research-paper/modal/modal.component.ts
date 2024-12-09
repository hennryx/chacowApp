import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestApiService } from '../../../../../services/api/rest-api.service';
import { Paper } from '../../../../../../../models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'AddResearch',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnChanges {
  loading: Boolean = false;
  @Input() isFormModalOpen: boolean = false;
  @Input() editResearch: any = {
    id: 0,
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
  };
  @Input() isEditModalOpen: boolean = false;
  @Output() _closeModal = new EventEmitter<boolean>();
  @Output() getResearch = new EventEmitter<void>();

  constructor(
    private restApi: RestApiService,
    private messageService: MessageService
  ) {}

  researchForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    datestarted: new FormControl('', [Validators.required]),
    datecompleted: new FormControl('', [Validators.required]),
    publicationdate: new FormControl(''),
    journal: new FormControl(''),
    volumenumber: new FormControl('', [Validators.required]),
    issue: new FormControl(''),
    issn: new FormControl(''),
    doi: new FormControl(''),
    url: new FormControl(''),
    keywords: new FormControl('', [Validators.required]),
    taggeduseremail: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFormModalOpen && this.editResearch != null) {
      this.researchForm.patchValue({
        title: this.editResearch.title,
        type: this.editResearch.type,
        datestarted: this.editResearch.datestarted,
        datecompleted: this.editResearch.datecompleted,
        publicationdate: this.editResearch.publicationdate,
        journal: this.editResearch.journal,
        volumenumber: this.editResearch.volumenumber,
        issue: this.editResearch.issue,
        issn: this.editResearch.issn,
        doi: this.editResearch.doi,
        url: this.editResearch.url,
        keywords: this.editResearch.keywords,
        taggeduseremail: this.editResearch.taggeduser,
      });
    }
  }

  closeModal() {
    this._closeModal.emit(false);
    this.researchForm.reset();
  }

  updatePaper() {
    let papers = JSON.parse(localStorage.getItem('papers') || '[]');

    const updateobject = {
      id: this.editResearch.id,
      status: this.researchForm.value.datecompleted
        ? 'Completed'
        : this.researchForm.value.publicationdate
        ? 'Published'
        : 'Unpublished',
      ...this.researchForm.value,
    };

    // filter the object, and remove the old data
    papers = papers.filter((x: any) => x.id != this.editResearch.id);
    papers.push(updateobject);

    let stringpapers = JSON.stringify(papers);

    localStorage.setItem('papers', stringpapers);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Research Successfully Updated!',
    });
  }

  createPaper() {
    let papers = JSON.parse(sessionStorage.getItem('papers') || '[]');

    const currentid = papers.length == 0 ? 1 : papers[papers.length - 1].id + 1;

    papers.push({
      id: currentid,
      status: this.researchForm.value.datecompleted
        ? 'Completed'
        : this.researchForm.value.publicationdate
        ? 'Published'
        : 'Unpublished',
      ...this.researchForm.value,
    });

    let stringpapers = JSON.stringify(papers);
    sessionStorage.setItem('papers', stringpapers);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Research Successfully Added!',
    });
  }

  handleSave(research: any) {
    if (this.researchForm.errors) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Internal server error!',
      });
      return;
    }

    if (this.editResearch) {
      // update data
      this.updatePaper();
      return;
    }

    // create new record
    this.createPaper();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.researchForm.get(fieldName);
    return (control?.invalid && control?.touched) || false;
  }
}
