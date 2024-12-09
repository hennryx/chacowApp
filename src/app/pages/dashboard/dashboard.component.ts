import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'heroPage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class heroPageComponent implements OnInit {
  searchQuery: string = '';
  selectedStatus: string = 'All';
  selectedType: string = 'All';
  papers: any = [];
  filteredpapers: any = [];

  ngOnInit(): void {
    this.getAllDocs();
  }

  searchpaper(): void {
    const query = this.searchQuery.toLowerCase();

    let filtered = this.papers.filter((x: any) =>
      x.title.includes(query) || x.keywords.includes(query)
    );

    if (this.selectedStatus && this.selectedStatus !== 'All') {
      filtered = filtered.filter((x: any) => x.status === this.selectedStatus);
    }

    if (this.selectedType && this.selectedType !== 'All') {
      filtered = filtered.filter((x: any) => x.type === this.selectedType);
    }

    this.filteredpapers = filtered;
  }

  getAllDocs() {
    const papers = JSON.parse(sessionStorage.getItem('papers') || '[]');
    this.papers = papers;
    console.log(papers);
    
    this.filteredpapers = papers;
  }

  openDocument(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('no URL for this document');
      console.error('Document URL is not available.');
    }
  }
}
