import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
    userData: User = {
        id: 0,
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        role: '',
    };

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        const data = localStorage.getItem('userData')
        this.userData = data ? JSON.parse(data) : null
    }

    logout() {
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
        this.router.navigate(['/'])
    }

}
