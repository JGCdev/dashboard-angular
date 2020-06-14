import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Archivo, Proyecto } from '@modules/proyectos/models';
import { ProyectosService } from '@modules/proyectos/services';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '@common/components';

@Component({
    selector: 'sb-archivos',
    templateUrl: './archivos.component.html',
    styleUrls: ['archivos.component.scss'],
})
export class ArchivosComponent implements OnInit {
    dataSource: MatTableDataSource<Archivo>;
    addFileForm: FormGroup;
    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort!: MatSort;
    displayedColumns: string[] = ['preview', 'nombre', 'size', 'fechaSubida', 'actions'];
    private file: File | null = null;
    loading = {
        text: '',
        state: false,
    };
    proyecto: Proyecto;
    constructor(private fb: FormBuilder, private ps: ProyectosService, private router: Router, public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource();
        this.proyecto = this.ps.proyectoSelected;
        this.addFileForm = this.fb.group({
            archivo: ['', Validators.required],
        });
    }

    // Fix no nos hace falta el id en la ruta - ver como corregir
    ngOnInit() {
        if (!this.proyecto) {
            this.router.navigate(['proyectos']);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.proyecto.archivos;
        console.log('Proyecto seleccionado: ', this.ps.proyectoSelected);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    delete(name: string) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                console.log('borrarmos archivo: ', name);
                console.log(this.proyecto);
                const data = {
                    nombre: name,
                    idProyecto: this.proyecto._id,
                };
                this.ps.deleteFile(data).subscribe(res => {
                    if (res) {
                        console.log('borramos archivo');
                        this.proyecto.archivos = this.proyecto.archivos.filter((elem) => elem.nombre !== data.nombre);
                        this.dataSource.data = this.proyecto.archivos;
                    }
                });
            }
        });
    }

    download(nombre: string) {
        console.log('descargamos: ', nombre);
        this.loading.state = true;
        this.loading.text = 'Preparando descarga...';
        this.ps.download(nombre).subscribe(res => {
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = nombre;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            console.log(res);
            this.loading.state = false;
        });
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0]);
            this.file = event.target.files[0];
            this.addFileForm.patchValue({
                arcivo: this.file,
            });
        }
    }

    onSubmit() {
        if (this.addFileForm.valid) {
            console.log('Form válido');
            console.log('Archivo ', this.addFileForm.value.archivo);

            this.loading.state = true;
            this.loading.text = 'Subiendo archivo...';

            this.ps.subirArchivo(this.proyecto, this.file).subscribe(
                res => {
                    console.log('Archivo subido', res.result.archivos);
                    this.dataSource.data = res.result.archivos;
                    this.proyecto.archivos = res.result.archivos;

                    this.loading.state = false;
                },
                err => {
                    console.log('Error: ', err);
                    this.loading.state = false;
                }
            );
        } else {
            console.log('formulario invalido', this.addFileForm);
        }
    }
}
