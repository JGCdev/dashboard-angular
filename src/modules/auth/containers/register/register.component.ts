import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMsg: string | undefined;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private cdRef: ChangeDetectorRef
    ) {
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            pass: ['', Validators.required],
            passRepeat: ['', Validators.required],
            nombre: ['', Validators.required],
            apellidos: [''],
            telefono: ['', Validators.required],
            empresa: [''],
            direccion: [''],
        });
    }
    onSubmit() {
        if (
            this.registerForm.valid &&
            this.registerForm.value.pass === this.registerForm.value.passRepeat
        ) {
            const user = {
                id: '',
                email: this.registerForm.value.email,
                pass: this.registerForm.value.pass,
                nombre: this.registerForm.value.nombre,
                apellidos: this.registerForm.value.apellidos,
                direccion: this.registerForm.value.direccion,
                telefono: this.registerForm.value.telefono,
                empresa: this.registerForm.value.empresa,
                fechaIngreso: String(new Date()),
                admin: false,
            };
            this.authService.registro(user).subscribe(
                res => {
                    console.log('Usuario creado: ', res);
                    this.router.navigate(['auth/login']);
                },
                err => {
                    console.log('Error: ', err);
                    if (err.error.code === 11000) {
                        console.log('Email duplicado');
                        this.errorMsg = 'El email seleccionado ya existe en la base de datos';
                    } else {
                        this.errorMsg = 'Error al crear el usuario';
                    }
                    this.cdRef.detectChanges();
                }
            );
        } else {
            console.log('formulario invalido', this.registerForm);
            this.errorMsg = 'Formulario inválido, rellena los campos obligatorios (*)';
        }
    }

    ngOnInit() {}
}
