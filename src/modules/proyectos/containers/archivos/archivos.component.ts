import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from '@modules/proyectos/services';
import { Proyecto, Archivo } from '@modules/proyectos/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sb-archivos',
    templateUrl: './archivos.component.html',
    styleUrls: ['archivos.component.scss'],
})
export class ArchivosComponent implements OnInit {
    dataSource: MatTableDataSource<Archivo>;

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort!: MatSort;
    displayedColumns: string[] = ['preview', 'nombre', 'fechaSubida', 'actions'];

    proyecto: Proyecto;
    constructor(private ps: ProyectosService, private router: Router) {
        this.dataSource = new MatTableDataSource();
        this.proyecto = this.ps.proyectoSelected;
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

    download(nombre: string) {
        console.log('descargamos: ', nombre);
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
        });
    }
}
