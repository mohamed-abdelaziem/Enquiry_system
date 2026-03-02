import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink , RouterLinkActive , ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
 isMenuOpen = false;
 masterService = inject(MasterService);
  router = inject(Router);
 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  };


  loggOff(){
    this.masterService.isLogged.set(false);
    localStorage.removeItem('enquiryData');
    this.router.navigateByUrl('/home');
  }
}
