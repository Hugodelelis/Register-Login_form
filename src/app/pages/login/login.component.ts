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
} from '../../validators/cont.validators';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  #fb = inject(FormBuilder);

  LoginForm!: FormGroup;

  ngOnInit(): void {
    this.LoginForm = this.#fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  // funcs

  onSubmit(): void {
    if (this.LoginForm.valid) {
      Swal.fire({
        title: 'Good job!',
        text: 'Login successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      console.log(this.LoginForm.value);
      console.log('Falha ao enviar');
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
