import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Department } from '../../models/department';
import { RestApiService } from '../../services/api/rest-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let _defaultDepartment: Department = {
    id: 0,
    label: '',
    depname: ''
}

@Component({
  selector: 'Program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program.component.html',
  styleUrl: './program.component.css'
})
export class ProgramComponent implements OnInit {
    @Output() selectedProgram = new EventEmitter<Department>();
    @Input() isFull: boolean = false;
    @Input() editMode: number = 0;

    defaultProgram: number = 0;
    programs: Department[] = [];

    constructor(private restApi: RestApiService) {}

    ngOnInit(): void {
        this.handleGetDepartment();
    }

    handleGetDepartment() {
        const name = 'department/all'
        this.restApi.get<Department[]>(name).subscribe({
            next: (response) => {
                if (response.length > 0) {
                    this.programs = response;
                    
                    if(this.editMode === 0) {
                        this.defaultProgram = response[0].id;
                    }
                    
                    if(this.editMode !== 0) {
                        this.defaultProgram = this.editMode;
                    }
                    
                    this.filterByProgram()
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    filterByProgram() {
        const program = this.programs.find(department => department.id === this.defaultProgram)
        this.selectedProgram.emit(program)
    }
}
