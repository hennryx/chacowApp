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

  constructor(private restApi: RestApiService) {}

  researchForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    datestarted: new FormControl('', [Validators.required]),
    datecompleted: new FormControl(''),
    publicationdate: new FormControl(''),
    journal: new FormControl('', [Validators.required]),
    volumenumber: new FormControl('', [Validators.required]),
    issue: new FormControl('', [Validators.required]),
    issn: new FormControl('', [Validators.required]),
    doi: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    keywords: new FormControl('', [Validators.required]),
    taggeduseremail: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.editResearch);

    if (this.isEditModalOpen) {
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
        taggeduseremail: this.editResearch.taggeduser
          .map((x: any) => x.useremail)
          .join(', '),
      });
    }
  }

  closeModal() {
    this._closeModal.emit(false);
  }

  handleSave(research: any) {
    const endpoint =
      'http://localhost:3000/api/v1/paper/' +
      (this.editResearch?.id ? 'update' : 'add');

    let data = this.researchForm.value;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        id: this.editResearch.id ? this.editResearch.id : undefined,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    // this.restApi.post('api/v1/paper/add', data);
  }
}
