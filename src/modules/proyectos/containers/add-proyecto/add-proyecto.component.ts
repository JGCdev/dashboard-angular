import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from '@modules/proyectos/services/proyectos.service';

@Component({
    selector: 'sb-add-proyecto',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-proyecto.component.html',
    styleUrls: ['add-proyecto.component.scss']
})
export class AddProyectoComponent implements OnInit {
    registerProjectForm: FormGroup;
    errorMsg: string | undefined;
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

    constructor(
        private fb: FormBuilder,
        private projectsService: ProyectosService,
        private router: Router
    ) {
        this.registerProjectForm = this.fb.group({
            nombre: ['', Validators.required],
            nombreDis: [''],
            packaging: ['', Validators.required],
            material: [''],
            impresor: [''],
            archivo: [''],
        });

    }
    onSubmit() {
        if (this.registerProjectForm.valid) {
            const project = {
                id: '',
                email: this.registerProjectForm.value.email,
                pass: this.registerProjectForm.value.pass,
                nombre: this.registerProjectForm.value.nombre,
                apellidos: this.registerProjectForm.value.apellidos,
                direccion: this.registerProjectForm.value.direccion,
                telefono: this.registerProjectForm.value.telefono,
                empresa: this.registerProjectForm.value.empresa,
                fechaIngreso: String(new Date()),
                admin: this.registerProjectForm.value.admin,
            };
            console.log('Enviamos proyecto: ', project);
            this.projectsService.registro(project).subscribe(
                res => {
                    console.log('Proyecto creado: ', res);
                    this.router.navigate(['proyectos']);
                },
                err => {
                    console.log('Error: ', err);
                }
            );
        } else {
            console.log('formulario invalido', this.registerProjectForm);
            this.errorMsg = 'Formulario inválido, rellena los campos obligatorios (*)';
        }
    }

    ngOnInit() {
    }
}
