import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from '@modules/proyectos/services/proyectos.service';
import { Proyecto } from '@modules/proyectos/models';

@Component({
    selector: 'sb-add-proyecto',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
            tipoArchivo: [''],
            archivo: [''],
        });
    }

    onSubmit() {
        if (this.registerProjectForm.valid) {
            const project: Proyecto = {
                id: '',
                nombre: this.registerProjectForm.value.nombre,
                nombreDis: this.registerProjectForm.value.nombreDis,
                packaging: this.registerProjectForm.value.packaging,
                material: this.registerProjectForm.value.material,
                impresor: this.registerProjectForm.value.impresor,
                tipoArchivo: this.registerProjectForm.value.tipoArchivo,
                preview: '',
                cliente: 'set client',
                artwork: '',
                fecha: String(Date()),
                informe: '',
                contacto: '',
                estado: '0',
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
            console.log(event.target.files[0]);
            this.file = event.target.files[0];
            this.registerProjectForm.patchValue({
                arcivo: this.file,
            });
        }
    }

    ngOnInit() {
    }
}
