import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
    attendanceData = [
        {
            date: '2024-11-20',
            records: [
                { id: 1, subjectCode: 'CS101', subjectName: 'Introduction to Programming', description: 'Lecture', program: 'BS Computer Science' },
                { id: 2, subjectCode: 'MATH201', subjectName: 'Calculus', description: 'Lecture', program: 'BS Mathematics' },
            ],
        },
        {
            date: '2024-11-21',
            records: [
                { id: 3, subjectCode: 'ENG101', subjectName: 'English Composition', description: 'Lecture', program: 'BA English' },
                { id: 4, subjectCode: 'PHYS101', subjectName: 'Physics I', description: 'Laboratory', program: 'BS Physics' },
            ],
        },
        {
            date: '2024-11-22',
            records: [
                { id: 3, subjectCode: 'ENG102', subjectName: 'English Composition 2', description: 'Lecture', program: 'BA English' },
                { id: 4, subjectCode: 'PHYS102', subjectName: 'Physics II', description: 'Laboratory', program: 'BS Physics' },
            ],
        },
    ];

    ngOnInit(): void {
        const today = new Date().toISOString().split('T')[0];  
        this.attendanceData.sort((a, b) => {
            if (a.date === today) return -1;  
            if (b.date === today) return 1;   
            return new Date(b.date).getTime() - new Date(a.date).getTime(); 
        });
    }
}
