import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormArray, Validators, FormGroup } from '@angular/forms';
import { nameValidator, emailValidator, passwordValidator, genderValidator } from '../validators/register.validators';
import IGender from '../interface/gender.interface';
import ITec from '../interface/tec.interface';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  #fb = inject(FormBuilder)

  RegisterForm!: FormGroup

  ngOnInit(): void {
    this.RegisterForm = this.#fb.group({
      name: ['', [ Validators.required, nameValidator() ] ], 
      email: ['', [ Validators.required, emailValidator() ] ],
      password: ['', [ Validators.required, passwordValidator() ] ],
      gender: ['', [ Validators.required, genderValidator() ] ],
      tec: this.#fb.array([], Validators.required) 
    })
  }

onTecChange(event: any) {
    const formArray: FormArray = this.RegisterForm.get('tec') as FormArray;

    if (event.target.checked) {
      formArray.push(this.#fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.RegisterForm.valid) {
      console.log("Form enviado");
      console.log(this.RegisterForm.value)
    } else {
      console.log(this.RegisterForm.value)
      console.log("Falha ao enviar")
    }
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
    } 
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
    } 
  ]);

  get name() {
    return this.RegisterForm.get('name')
  }

  get email() {
    return this.RegisterForm.get('email')
  }

  get password() {
    return this.RegisterForm.get('password')
  }

  get gender() {
    return this.RegisterForm.get('gender')
  }

  get tec() {
    return this.RegisterForm.get('tec')
  }

}
