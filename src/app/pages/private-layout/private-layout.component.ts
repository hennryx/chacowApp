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
    title: string = 'Atete';
    isOpen: boolean = true;
    isLogin: boolean  = false;
    isSidebarExpanded: boolean =true;
    showSidebarAndHeader: boolean = true;
    userData: User | null = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        if(this.authService.isLoggedIn()) {
            this.authService.getUserData().subscribe({
                next: (response) => {
                    this.userData = response;
                    this.isLogin = this.authService.isLoggedIn()
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }

    handleOpenSidebar() {
        this.isOpen = !this.isOpen;
    }

    checkIf404Page(url: string): void {
        this.showSidebarAndHeader = url !== '/' && url !== '/not-found';
    }
}
