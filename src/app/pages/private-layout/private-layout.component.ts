import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent implements OnInit{
    title: string = 'RET AIMS';
    isOpen: boolean = true;
    isLogin: boolean  = false;
    isSidebarExpanded: boolean =true;
    showSidebarAndHeader: boolean = true;
    userData: any = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        const storedUserData = localStorage.getItem('userData');
        this.userData = storedUserData ? JSON.parse(storedUserData) : null;
    }

    handleOpenSidebar() {
        this.isOpen = !this.isOpen;
    }

    checkIf404Page(url: string): void {
        this.showSidebarAndHeader = url !== '/' && url !== '/not-found';
    }
}
