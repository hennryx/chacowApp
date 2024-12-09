import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'Register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    @Output() _showLogin = new EventEmitter<any>();
    registerForm = new FormGroup({
        id: new FormControl(0),
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl(''),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        acceptTerms: new FormControl(false),
        role: new FormControl(''),
    })
    errorMsg: string = ""
    iconType: string = "success"
    contentTxt: string = "im just a txt"
    passwordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;

    constructor(private authService: AuthService, private messageService: MessageService) { }

    togglePasswordVisibility(field: string) {
        if (field === 'password') {
            this.passwordVisible = !this.passwordVisible;
        } else if (field === 'confirmPassword') {
            this.confirmPasswordVisible = !this.confirmPasswordVisible;
        }
    }

    showLogin() {
        this._showLogin.emit(true)
    }

    handleRegister(event: Event) {
        event.preventDefault()
        const {
            password,
            confirmPassword,
            acceptTerms,
            ...res
        } = this.registerForm.value;

        const data = {
            ...res,
            password,
            role: "student"
        }

        if (password !== confirmPassword) {
            this.errorMsg = "Confirmation password didn't match";
            return;
        }

        if (!acceptTerms) {
            this.errorMsg = "You must agree to the terms and conditions.";
            return;
        }

        if (this.registerForm.valid) {

            let data = this.registerForm.value;
            data.role = 'student';

            const storedUserData = localStorage.getItem('users');
            let oldData = storedUserData ? JSON.parse(storedUserData) : [];

            data.id = Number(new Date().getTime())
            let updatedData = [...oldData, data];
            localStorage.setItem('users', JSON.stringify(updatedData));
        }
    }
}
