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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'AddDocuments',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnChanges {
  loading: Boolean = false;
  @Input() isFormModalOpen: boolean = false;
  @Input() editDocuments: any = {
    id: 0,
    materialtitle: '',
    type: '',
    description: '',
    file: '',
  };
  @Input() isEditModalOpen: boolean = false;
  @Output() _closeModal = new EventEmitter<boolean>();
  @Output() getDocuments = new EventEmitter<void>();
  fileref!: string;

  constructor(
    private restApi: RestApiService,
    private messageService: MessageService
  ) {}

  documentsForm = new FormGroup({
    materialtitle: new FormControl('', [Validators.required]),
    type: new FormControl('ISO Forms', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFormModalOpen && this.editDocuments != null) {
      this.documentsForm.patchValue({
        materialtitle: this.editDocuments.materialtitle,
        description: this.editDocuments.description,
        file: this.editDocuments.file,
      });

      this.fileref = this.editDocuments.file;
    }
  }

  closeModal() {
    this._closeModal.emit(false);
    this.documentsForm.reset();
    this.editDocuments = null;
  }

  onFileChange(event: Event) {
    const file = (event?.target as any).files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.fileref = reader.result as string;
    };

    reader.readAsDataURL(file); // Convert file to Base64
  }

  updateDocument() {
    let documents = JSON.parse(sessionStorage.getItem('documents') || '[]');

    const updateobject = {
      id: this.editDocuments.id,
      ...this.documentsForm.value,
    };

    // filter the object, and remove the old data
    documents = documents.filter((x: any) => x.id != this.editDocuments.id);
    documents.push(updateobject);

    sessionStorage.setItem('documents', JSON.stringify(documents));

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Research Successfully Updated!',
    });
  }

  createDocument() {
    let documents = JSON.parse(sessionStorage.getItem('documents') || '[]');

    const currentid =
      documents.length == 0 ? 1 : documents[documents.length - 1].id + 1;

    documents.push({
      ...this.documentsForm.value,
      file: this.fileref,
      id: currentid,
    });

    sessionStorage.setItem('documents', JSON.stringify(documents));

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Document Successfully Added!',
    });
  }

  handleSave(documents: any) {
    if (this.documentsForm.errors) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Internal server error!',
      });
      return;
    }

    if (this.editDocuments) {
      this.updateDocument();
    } else {
      this.createDocument();
    }

    this.fileref = '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.documentsForm.get(fieldName);
    return (control?.invalid && control?.touched) || false;
  }
}
