import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestApiService } from '../../../../services/api/rest-api.service';

interface Document {
    id: number;
    materialtitle: string;
    description: string;
    type: string;
    dateadded: string;
    urlRef: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    searchQuery: string = '';
    documents: Document[] = [];
    filteredDocuments: Document[] = [];

    constructor(private restApi: RestApiService) { }

    ngOnInit(): void {
        this.getAllDocs()
    }

    searchDocuments(): void {
        if (!this.searchQuery) {
            this.filteredDocuments = this.documents;
            return;
        }

        const query = this.searchQuery.toLowerCase();

        this.filteredDocuments = this.documents.filter(doc =>
            doc.materialtitle.toLowerCase().includes(query) ||
            doc.description.toLowerCase().includes(query) ||
            doc.type.toLowerCase().includes(query)
        );
    }


    getAllDocs() {
        this.restApi.get('material/all').subscribe({
            next: (response) => {
                let data: any = response;
                this.filteredDocuments = data.map((item: any) => ({ ...item, type: "PDF" }))
                this.documents = data.map((item: any) => ({ ...item, type: "PDF" }))
                console.log(this.filteredDocuments);

            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    openDocument(url: string): void {
        if(url) {
            window.open(url, '_blank');
        } else {
            alert("no URL for this document")
            console.error('Document URL is not available.');
        }
    }
}