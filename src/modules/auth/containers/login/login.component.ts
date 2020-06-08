import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMsg: string | undefined;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private cdRef: ChangeDetectorRef
    ) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            pass: ['', Validators.required],
        });
    }
    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe(
                (res: any) => {
                    localStorage.setItem('access_token', res.token);
                    this.authService.getUserProfile(res._id).subscribe(
                        (response: any) => {
                            this.authService.currentUser = response;
                            localStorage.setItem('user', JSON.stringify(response));
                            console.log('Current user: ', this.authService.currentUser);
                            console.log('navegamos a pagina principal');
                            this.router.navigate(['dashboard']);
                        },
                        err => {
                            console.log(err);
                            this.errorMsg = 'Error al recuperar el perfil de usuario';
                        }
                    );
                },
                err => {
                    console.log(err);
                    this.errorMsg = 'Login erróneo';
                    this.cdRef.detectChanges();
                }
            );
        } else {
            console.log(this.loginForm);
            this.errorMsg = 'Formulario inválido';
        }
    }

    ngOnInit() {}
}
