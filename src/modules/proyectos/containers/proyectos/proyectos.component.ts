import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '@modules/proyectos/models';
import { ProyectosService } from '@modules/proyectos/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '@common/components';

@Component({
    selector: 'sb-proyectos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './proyectos.component.html',
    styleUrls: ['proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
    placeholder = './assets/img/thumb_placeholder.jpg';
    fases = [
        {
            text: 'Esperando validación',
            style: 'fase-s comp-s',
        },
        {
            text: 'Esperando Cierre',
            style: 'fase-s cierr-s',
        },
        {
            text: 'Pendiente info',
            style: 'fase-s info-s',
        },
        {
            text: 'Informe disponible',
            style: 'fase-s dispo-s',
        },
    ];
    displayedColumns: string[] = [
        'preview',
        'nombre',
        'fecha',
        'archivos',
        'informe',
        'clienteNombre',
        'artwork',
        'contacto',
        'estado',
        'actions',
    ];
    dataSource: MatTableDataSource<Proyecto>;

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort!: MatSort;

    proyectos: Array<Proyecto> | undefined;

    constructor(private ps: ProyectosService, private router: Router, public dialog: MatDialog) {
        // Create 100 users
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getProyectos();
    }

    getProyectos() {
        this.ps.getProyectos().subscribe(res => {
            console.log(res);
            this.dataSource.data = res;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDetails(proyecto: any) {
        this.ps.proyectoSelected = proyecto;
        this.router.navigate(['proyectos/archivos/']);
    }

    delete(id: string) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.ps.deleteProject(id).subscribe(
                    res => {
                        console.log('Usuario eliminado', res);
                        this.getProyectos();
                    },
                    err => {
                        console.log('Error al eliminar usuario', err);
                    }
                );
            }
        });
    }

    edit() {

    }
}
