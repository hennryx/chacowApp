import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { accessRoutes } from '../../config/access.config';
import { UserData } from '../../models/userData';
  
@Component({
    selector: 'Login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Output() _showRegister = new EventEmitter<any>();
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        rememberMe: new FormControl(false)
    });
    errorMsg: string = '';
    passwordFieldType: string = 'password';

    constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {
        const storedEmail = localStorage.getItem('rememberedEmail');
        if (storedEmail) {
            this.loginForm.patchValue({ email: storedEmail, rememberMe: true });
        }
    }

    showRegister() {
        this._showRegister.emit(false);
    }

    togglePasswordVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        if (this.loginForm.valid) {
            console.log('Login details');
            console.table(this.loginForm.value);

            const { email, password, rememberMe } = this.loginForm.value;
            this.authService.login(email!, password!).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.authService.saveToken(response.accessToken);
                    this.authService.setUserId(response.id);

                    this.authService.fetchUserData()?.subscribe({
                        next: (userData: UserData) => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully login' });
                            
                            let access = accessRoutes[userData.role];
                            this.authService.setUserData(userData);
                            this.router.navigate([access[0].path]);
                        },
                        error: (error) => {
                            console.error('Failed to fetch user data after login', error);
                        }
                    });
                },
                error: (err: any) => {
                    console.log(err);
                    this.errorMsg = err.error.message;

                    setTimeout(() => {
                        this.errorMsg = '';
                    }, 3000);
                }
            });
        } else {
            console.error('Form is invalid');
        }
    }
}
