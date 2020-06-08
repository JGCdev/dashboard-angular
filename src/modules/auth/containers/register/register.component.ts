import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            pass: ['', Validators.required],
            passRepeat: ['', Validators.required],
            nombre: ['', Validators.required],
            apellidos: [''],
            telefono: [''],
            empresa: [''],
            direccion: [''],
        });
    }
    onSubmit() {
        if (
            this.registerForm.valid &&
            this.registerForm.value.pass === this.registerForm.value.passRepeat
        ) {
            const user: User = {
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
            this.authService.registro(user).subscribe(res => {
                console.log('Usuario creado: ', res);
                this.router.navigate(['auth/login']);
            });
        } else {
            console.log('formulario invalido', this.registerForm);
        }
    }

    ngOnInit() {}
}
