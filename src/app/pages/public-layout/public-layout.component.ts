import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent  implements OnInit {
  title: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.data.subscribe(data => {
      this.title = data['title'];
    });

  }
}
