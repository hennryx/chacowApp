import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, ToastModule, ConfirmDialogModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    currentUser: User | null = null;
    title: string = 'Atete';
    isLogin: boolean = false;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

    userData: any;

    showToast() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'This is a toast message!' });
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {

            this.authService.fetchUserData()?.subscribe({
                next: (response) => {
                    this.authService.setUserData(response);
                    this.userData = response;
                },
                error: (error) => {
                    console.error('Failed to fetch user data', error);
                }
            });
        }

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkIf404Page(event.urlAfterRedirects);
            }
        });
    }


    checkIf404Page(url: string): void {
        /* do something here b1tch remove sidebar and header*/
    }

    
}