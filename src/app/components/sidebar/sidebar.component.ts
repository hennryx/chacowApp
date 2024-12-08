import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { accessRoutes } from '../../config/access.config';

@Component({
    selector: 'Sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
    @Input() isOpen: boolean = true;
    @Input() title: string = ""

    availableRoutes: { path: string; title: string; icon: string }[] = [];


    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }
    ngOnInit(): void {
        const userRole = this.authService.getUserRole() || "student";
        this.availableRoutes = accessRoutes[userRole];
        console.log(this.availableRoutes);
        
    }

    logout() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logout!' });
        this.authService.logout();
        this.router.navigate(['/'])
    }
}
