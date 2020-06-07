import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            pass: ['', Validators.required],
        });
    }
    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value);
        } else {
            console.log('formulario invalido', this.loginForm);
        }
    }

    ngOnInit() {}
}
