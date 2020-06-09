import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { ClientesService } from '@modules/clientes/services';

@Component({
    selector: 'sb-add-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-clientes.component.html',
    styleUrls: ['add-clientes.component.scss'],
})
export class AddClientesComponent implements OnInit {
    registerForm: FormGroup;
    errorMsg: string | undefined;
    constructor(
        private fb: FormBuilder,
        private clientesService: ClientesService,
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
            admin: [false],
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
                admin: this.registerForm.value.admin,
            };
            console.log('Enviamos cliente: ', user);
            this.clientesService.registro(user).subscribe(
                res => {
                    console.log('Cliente creado: ', res);
                    this.router.navigate(['clientes']);
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
