import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { Department } from '../../../models/department';
import { Teacher } from '../../../models/teacher1';
import { RestApiService } from '../../../services/api/rest-api.service';
import { AddTeacherComponent } from '../teachers/add-teacher/add-teacher.component';
import { AddDepartmentComponent } from './add-department/add-department.component';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchbarComponent, DepartmentComponent,AddDepartmentComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  breedcrumb : string = "List";
  programs: Department[] = [];
  teachers : Teacher[] = [];

  editDepartment: Department = {
          id: 0,
          label: '',
          depname: ''
    
  };
  selectedTeacher: Teacher | null = null;
  selectedProgram : Department | null = null;
  selectedDepartment = null;
  filteredPrograms = this.programs;
  filteredTeachers = this.teachers;
  isLogin: boolean = false;
  isFormModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDropdownOpen: boolean = false;
  isdepartmentModalOpen: boolean = false;
  isToggleActionsOpen: boolean = false;

  constructor(private apiService: RestApiService ,private messageService: MessageService,  private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
      this.loadDepartments()
  }

  loadDepartments(): void {
      const name = "department/all"
      this.apiService.get<Department[]>(name).subscribe({
          next: (response) => {
              this.programs = response; 
              this.filteredPrograms = [...this.programs];
          },
          error: (err) => {
              console.log(err);
          }
      })
  }
  deleteDepartment(department: Department) {
      console.log(department);
      
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${department.label}?`,
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const apiEndpoint = `department/delete/${department.id}`;
          this.apiService.delete(apiEndpoint).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Successfully deleted!',
              });
              this.loadDepartments(); // Refresh the teachers list
              this.isToggleActionsOpen = false; // Close actions toggle
            },
            error: (err) => {
              console.error('Error deleting Department:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error deleting department!',
              });
            },
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Department deletion cancelled!',
          });
        },
      });
    }
  
  onDepartmentUpdated() {
      console.log("im loaded");
      
      this.loadDepartments();
  }

  toggleActions(department: Department) {
      if (this.selectedProgram?.id === department.id && this.isToggleActionsOpen) {
          this.isToggleActionsOpen = false;
          this.selectedProgram = null;
      } else {
          this.isToggleActionsOpen = true;
          this.selectedProgram = department;
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

  openEditModal(department: any) {
      this.breedcrumb = "Edit Department";
      this.isEditModalOpen = true;
      this.isFormModalOpen = false;
      this.selectedTeacher = department;
      console.log(department);
      
      this.editDepartment = { ...department };
  }

  closeModal(value: boolean) {
      this.breedcrumb = "Today";
      this.selectedTeacher = null;
      this.isdepartmentModalOpen = value;
      this.isFormModalOpen = false;
        this.isEditModalOpen = false;
  }
  
  filterByProgram() {
      if (this.selectedProgram) {
          this.filteredPrograms = this.programs.filter(department => (department.id === this.selectedProgram?.id));
      } else {
          this.filteredPrograms = this.programs;
      }
  }
}
