import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  emailValidator,
  passwordValidator,
} from '../../validators/account.validators';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  #fb = inject(FormBuilder);
  #authUser = inject(AuthenticationService)

  LoginForm!: FormGroup;

  ngOnInit(): void {
    this.LoginForm = this.#fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  // funcs

  onSubmit(): void {
    const loginData = this.LoginForm.value;
  
    if (this.LoginForm.valid) {
      const userExists = this.#authUser.getUser(loginData.email, loginData.password);
  
      if (userExists) {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }) } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email does not exist or password is incorrect!',
        });
      }
    }
  }

  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // declarations

  get password() {
    return this.LoginForm.get('password');
  }

  get email() {
    return this.LoginForm.get('email');
  }
}
