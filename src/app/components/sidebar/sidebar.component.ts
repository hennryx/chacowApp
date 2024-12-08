import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'Sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;
  @Input() title: string = ""

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  logout() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logout!' });
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
