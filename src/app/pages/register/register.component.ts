import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  genderValidator,
} from '../../validators/account.validators';
import IGender from '../../interfaces/gender.interface';
import ITec from '../../interfaces/tec.interface';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  #fb = inject(FormBuilder);
  router = inject(Router);
  #authUser = inject(AuthenticationService)

  RegisterForm!: FormGroup;

  ngOnInit(): void {
    this.RegisterForm = this.#fb.group({
      name: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
      gender: ['', [Validators.required, genderValidator()]],
      tec: this.#fb.array([], Validators.required),
    });
  }

  onSubmit(): void {
    const userData = this.RegisterForm.value;
  
    if (this.RegisterForm.valid) {
      const userAdded = this.#authUser.saveUser(userData);
  
      if (!userAdded) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already exists!",
        });
      } else {
        Swal.fire({
          title: 'Good job!',
          text: 'Account created successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
            this.router.navigate(['/login']);
        });
      }
    }
  }

  onTecChange(event: any) {
    const formArray: FormArray = this.RegisterForm.get('tec') as FormArray;

    if (event.target.checked) {
      formArray.push(this.#fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(
        (x) => x.value === event.target.value
      );
      formArray.removeAt(index);
    }
  }

  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // declarations

  public genders = signal<IGender[]>([
    {
      gender: {
        value: 'male',
        title: 'Male',
      },
    },
    {
      gender: {
        value: 'female',
        title: 'Female',
      },
    },
    {
      gender: {
        value: 'other',
        title: 'Other',
      },
    },
  ]);

  public tecs = signal<ITec[]>([
    {
      tec: {
        value: 'typescript',
        title: 'TypeScript',
      },
    },
    {
      tec: {
        value: 'angular',
        title: 'Angular',
      },
    },
    {
      tec: {
        value: 'sass',
        title: 'Sass',
      },
    },
    {
      tec: {
        value: 'boostrap',
        title: 'Bootstrap',
      },
    },
  ]);

  get name() {
    return this.RegisterForm.get('name');
  }

  get email() {
    return this.RegisterForm.get('email');
  }

  get password() {
    return this.RegisterForm.get('password');
  }

  get gender() {
    return this.RegisterForm.get('gender');
  }

  get tec() {
    return this.RegisterForm.get('tec');
  }
}
