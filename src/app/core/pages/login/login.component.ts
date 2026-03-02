import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  masterService = inject(MasterService);
  router = inject(Router);
  loginLoading = signal<boolean>(false);
  toastr = inject(ToastrService);

  togglePassword() {
    const input = document.getElementById('passwordInput') as HTMLInputElement;
    const icon = document.getElementById('toggleIcon') as HTMLElement;

    if (input == null) {
      return;
    } else {
      if (input?.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    }
  }

  onLogin() {
    this.loginLoading.set(true);
    if (
      this.loginForm.get('userName')?.value == 'admin' &&
      this.loginForm.get('password')?.value == '2233'
    ) {
      this.loginLoading.set(false);
      localStorage.setItem('enquiryData', 'logged');
      this.masterService.isLogged.set(true);
      this.toastr.success('Login Successufully');
      this.router.navigateByUrl('/enquiry-list');
    } else {
      this.loginLoading.set(false);
      this.toastr.error(`Wrong Data`);
    }
  }
}
