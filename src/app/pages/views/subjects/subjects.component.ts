import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableLoadingComponent } from '../../../components/table-loading/table-loading.component';
import { Subjects } from '../../../models/subjects';
import { ProgramComponent } from '../../../components/program/program.component';
import { Department } from '../../../models/department';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { RestApiService } from '../../../services/api/rest-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

interface ExtendedSubjects extends Subjects {
    department: Department;
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [FormsModule,CommonModule,TableLoadingComponent, ProgramComponent, AddSubjectComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})

export class SubjectsComponent implements OnInit{
    breedcrumb : string = "List";
    filteredSubjects: ExtendedSubjects[] = []
    subjects: ExtendedSubjects[] = []

    selectedProgram: Department = {
        id: 0,
        label: '',
        depname: ''
    };

    isloading = false;
    isLogin: boolean = false;

    isFormModalOpen = false;
    isEditModalOpen = false;
    selectedSubject: Subjects = {
        id: 0,
        subjectcode: '',
        subjectname: '',
        description: '',
        departmentid: 0
    };
    isToggleActionsOpen = false;

    constructor(private restApi: RestApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.getTeacher()
    }

    getTeacher() {
        this.restApi.get<ExtendedSubjects[]>('subject/all').subscribe({
            next: (response) => {
                this.subjects = response;
                this.handleFilterSubjects()
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    deleteSubject(subject: Subjects) {
       
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${subject.subjectname}?`,
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              const apiEndpoint = `subject/delete/${subject.id}`;
              this.restApi.delete(apiEndpoint).subscribe({
                next: () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Successfully deleted!',
                  });
                  this.getTeacher(); // Refresh the teachers list
                  this.isToggleActionsOpen = false; // Close actions toggle
                },
                error: (err) => {
                  console.error('Error deleting teacher:', err);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error deleting Subject!',
                  });
                },
              });
            },
            reject: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Cancelled',
                detail: 'Subject deletion cancelled!',
              });
            },
          });
    }
    
    toggleActions(subject: Subjects) {
        if (this.selectedSubject?.id === subject.id && this.isToggleActionsOpen) {
            this.isToggleActionsOpen = false;
        } else {
            this.isToggleActionsOpen = true;
            this.selectedSubject = subject;
        }
    }
    

    handleGetTeacher() {
        this.getTeacher()
    }

    openFormModal() {
        this.breedcrumb = "Add Subject";
        this.isFormModalOpen = true;
        this.isEditModalOpen = false;
    }

    openEditModal(subject: Subjects) {
        this.breedcrumb = "Add Subject";
        this.isEditModalOpen = true;
        this.isFormModalOpen = false;
        console.log(subject);
        
        this.selectedSubject = subject;
    }

    closeModal(value: boolean) {
        this.breedcrumb = "List";
        this.isFormModalOpen = value;
        this.isEditModalOpen = value;
        this.selectedSubject = {
            id: 0,
            subjectcode: '',
            subjectname: '',
            description: '',
            departmentid: 0
        };
    }

    filterByProgram(value: Department) {
        console.log(value.depname);
        this.selectedProgram = value;
        this.handleFilterSubjects()
    }

    handleFilterSubjects() {
        if(this.subjects.length > 0 && this.selectedProgram.id !== 0) {
            this.filteredSubjects = this.subjects
                .filter((subject) => {
                    return subject.department.id === this.selectedProgram.id})
        }
    }
}
