import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  papers: any = [];
  filteredpapers: any = [];

  ngOnInit(): void {
    this.getAllDocs();
  }

  searchpaper(): void {
    if (!this.searchQuery) {
      this.filteredpapers = this.papers;
      return;
    }

    const query = this.searchQuery.toLowerCase();

    this.filteredpapers = this.papers.filter((x: any) =>
      x.title.includes(query)
    );
  }

  getAllDocs() {
    const papers = JSON.parse(localStorage.getItem('papers') || '[]');
    this.papers = papers;
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
