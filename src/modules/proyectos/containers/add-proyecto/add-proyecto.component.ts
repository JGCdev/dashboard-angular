import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { AuthService } from '@modules/auth/services';
import { ClientesService } from '@modules/clientes/services';
import { Proyecto } from '@modules/proyectos/models';
import { ProyectosService } from '@modules/proyectos/services/proyectos.service';

@Component({
    selector: 'sb-add-proyecto',
    templateUrl: './add-proyecto.component.html',
    styleUrls: ['add-proyecto.component.scss'],
})
export class AddProyectoComponent implements OnInit {
    registerProjectForm: FormGroup;
    errorMsg: string | undefined;
    listPackaging: string[] = ['Cartón', 'Caja Cartón Ondulado', 'Estuche carboncillo'];
    listMaterial: string[] = ['Cartoncillo', 'Cartón Ondulado', 'Metal', 'Film plástico'];
    listArchivo: string[] = ['Master', 'Pre-artwork', 'Artwork'];
    private file: File | null = null;
    isAdmin: boolean | undefined;
    clientes: Array<User> | undefined;

    constructor(
        private fb: FormBuilder,
        private projectsService: ProyectosService,
        private router: Router,
        private as: AuthService,
        private cs: ClientesService
    ) {
        this.registerProjectForm = this.fb.group({
            nombre: ['', Validators.required],
            nombreDis: [''],
            packaging: ['', Validators.required],
            material: [''],
            impresor: [''],
            tipoArchivo: [''],
            archivo: [''],
            cliente: [null],
            contacto: [''],
        });
    }

    onSubmit() {
        if (this.registerProjectForm.valid) {
            if (this.isAdmin) {
                console.log(this.registerProjectForm.value);
                this.registerProjectForm.value.cliente.id = this.as.getUser()._id;
            }
            const project: Proyecto = {
                _id: '',
                nombre: this.registerProjectForm.value.nombre,
                nombreDis: this.registerProjectForm.value.nombreDis,
                packaging: this.registerProjectForm.value.packaging,
                material: this.registerProjectForm.value.material,
                impresor: this.registerProjectForm.value.impresor,
                tipoArchivo: this.registerProjectForm.value.tipoArchivo,
                preview: '',
                cliente: this.registerProjectForm.value.cliente.id,
                clienteNombre: this.registerProjectForm.value.cliente.nombre,
                artwork: '',
                fecha: String(Date()),
                informe: '',
                contacto: this.registerProjectForm.value.contacto,
                estado: '0',
                archivos: [],
            };

            console.log('Form válido, Proyecto: ', project);
            console.log('Archivo ', this.registerProjectForm.value.archivo);

            this.projectsService.registro(project, this.file).subscribe(
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

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    ngOnInit() {
        if (this.as.getUser().admin) {
            this.cs.getClientes().subscribe(res => {
                this.clientes = res;
                this.isAdmin = true;
                console.log(res);
            });
        }
    }

}
