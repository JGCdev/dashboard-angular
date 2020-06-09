import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { ClientesService } from '@modules/clientes/services';

@Component({
    selector: 'sb-edit-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-clientes.component.html',
    styleUrls: ['edit-clientes.component.scss'],
})
export class EditClientesComponent implements OnInit {
    editForm: FormGroup;
    errorMsg: string | undefined;
    id: string | null;
    constructor(
        private fb: FormBuilder,
        private clientesService: ClientesService,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
        this.id = '';
        this.editForm = this.fb.group({
            email: ['', Validators.required],
            nombre: ['', Validators.required],
            apellidos: [''],
            telefono: ['', Validators.required],
            empresa: [''],
            direccion: [''],
            admin: [false],
        });
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.clientesService.getCliente(params.get('id')).subscribe(res => {
                console.log(res);
                this.editForm.patchValue({ email: res.email });
                this.editForm.patchValue({ nombre: res.nombre });
                this.editForm.patchValue({ apellidos: res.apellidos });
                this.editForm.patchValue({ telefono: res.telefono });
                this.editForm.patchValue({ empresa: res.empresa });
                this.editForm.patchValue({ direccion: res.direccion });
                this.editForm.patchValue({ admin: res.admin });
            });
        });

    }
    onSubmit() {
        if (this.editForm.valid) {
            const user = {
                id: this.id,
                email: this.editForm.value.email,
                nombre: this.editForm.value.nombre,
                apellidos: this.editForm.value.apellidos,
                direccion: this.editForm.value.direccion,
                telefono: this.editForm.value.telefono,
                empresa: this.editForm.value.empresa,
                admin: this.editForm.value.admin,
            };
            this.clientesService.updateClient(user).subscribe(
                res => {
                    this.router.navigate(['clientes']);
                },
                err => {
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
            this.errorMsg = 'Formulario inválido, rellena los campos obligatorios (*)';
        }
    }
}
