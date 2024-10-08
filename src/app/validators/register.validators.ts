import { AbstractControl, ValidatorFn } from "@angular/forms";

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value; 
        let error = null;

        if (value.length === 0) {
            return { required: 'Preencha o campo' };
        }

        if (value.length < 4 || value.length > 10) {
            return error  = { invalidName: 'O nome deve estar entre 5 a 10 caracteres' };
        }

        return error;
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value;
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        let error = null;

        if (value.length === 0) {
            return { required: 'Preencha o campo' };
        }

        if(!regex.test(value)) {
            return error = { invalidEmail: 'O email deve ser Gmail' };
        }

        return error;
    };
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value;
        let error = null;

        if (value.length === 0) {
            return { required: 'Preencha o campo' };
        }

        if(value.length < 4 || value.length > 10) {
            return error = { invalidPassword: 'O password deve estar entre 5 a 10 caracteres' };
        }

        return error;
    };
}

export function genderValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value;
        let error = null;

        if (value === '') {
            return { required: 'Selecione o gênero' };
        }

        return error;
    };
}