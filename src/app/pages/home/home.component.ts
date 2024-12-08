import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  show: boolean = true;
  animate: boolean = false;

  showView(val: any) {
    this.show = val;
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 1000)
  }

}
