import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { Teacher } from '../../../models/teacher1';
import { Department } from '../../../models/department';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { RestApiService } from '../../../services/api/rest-api.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchbarComponent, AddTeacherComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
    breedcrumb : string = "List";
    programs: Department[] = [];
    teachers : Teacher[] = [];

    editTeacher: Teacher = {
        id: 0,
        firstname: '',
        middlename: '',
        lastname: '',
        department: {
            id: 0,
            label: '',
            depname: ''
        },
        departmentid: 0
    };
    selectedTeacher: Teacher | null = null;
    selectedProgram : Department | null = null;

    filteredTeachers = this.teachers;
    isLogin: boolean = false;
    isFormModalOpen: boolean = false;
    isEditModalOpen: boolean = false;
    isDropdownOpen: boolean = false;
    isdepartmentModalOpen: boolean = false;
    isToggleActionsOpen: boolean = false;

    constructor(private apiService: RestApiService ,private messageService: MessageService,  private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.loadTeachers()
    }

    loadTeachers(): void {
        const name = "teacher/table/all/1"
        this.apiService.get<Teacher[]>(name).subscribe({
            next: (response) => {
                this.teachers = response; 
                this.filterByProgram()
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    deleteTeacher(teacher: Teacher) {
        console.log(teacher);
        
        this.confirmationService.confirm({
          message: `Are you sure you want to delete ${teacher.firstname} ${teacher.lastname}?`,
          header: 'Confirm Deletion',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const apiEndpoint = `teacher/delete/${teacher.id}`;
            this.apiService.delete(apiEndpoint).subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Successfully deleted!',
                });
                this.loadTeachers(); // Refresh the teachers list
                this.isToggleActionsOpen = false; // Close actions toggle
              },
              error: (err) => {
                console.error('Error deleting teacher:', err);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error deleting teacher!',
                });
              },
            });
          },
          reject: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Teacher deletion cancelled!',
            });
          },
        });
      }
    
    onTeacherUpdated() {
        console.log("im loaded");
        
        this.loadTeachers();
    }

    toggleActions(teacher: Teacher) {
        if (this.selectedTeacher?.id === teacher.id && this.isToggleActionsOpen) {
            this.isToggleActionsOpen = false;
            this.selectedTeacher = null;
        } else {
            this.isToggleActionsOpen = true;
            this.selectedTeacher = teacher;
        }
    }
    

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen; 
    }
    openFormDep() {
        this.breedcrumb = "Add Department";
        this.isdepartmentModalOpen = true;
    }

    openFormModal() {
        this.breedcrumb = "Add Teacher";
        this.isFormModalOpen = true;
        this.isEditModalOpen = false;
    }

    openEditModal(teacher: any) {
        this.breedcrumb = "Edit Teacher";
        this.isEditModalOpen = true;
        this.isFormModalOpen = false;
        this.selectedTeacher = teacher;
        console.log(teacher);
        
        this.editTeacher = { ...teacher };
    }

    closeModal(value: boolean) {
        this.breedcrumb = "Today";
        this.isFormModalOpen = value;
        this.isEditModalOpen = value;
        this.selectedTeacher = null;
        this.isdepartmentModalOpen = value;
    }
    
    filterByProgram() {
        if (this.selectedProgram) {
            this.filteredTeachers = this.teachers.filter(teacher => (teacher.department as Department).id === this.selectedProgram?.id);
        } else {
            this.filteredTeachers = this.teachers;
        }
    }
}
