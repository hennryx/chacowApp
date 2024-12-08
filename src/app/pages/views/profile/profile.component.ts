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
        suffix: ''
    };

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.getUserData().subscribe({
            next: (data) => {
                this.userData = data;
                console.log(this.userData);
                
            },
            error: (error) => console.error("Failed to load user data", error)
          });
    }

    logout() {
        this.router.navigate(['/'])
    }
}
