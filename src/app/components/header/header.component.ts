import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isLogin: boolean = false;
  @Input() title: string = "";
  @Input() fullName: User | null = {
    id: 0,
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    suffix: '',
  };
}
