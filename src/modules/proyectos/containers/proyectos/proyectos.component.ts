import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '@modules/proyectos/models';

const users: Proyecto[] = [
    {
        id: '12sdsd',
        nombre: 'Proyecto SOL',
        fecha: '23/06/220',
        archivos: '666555444',
        informe: 'sdfsd@dsd.com',
        cliente: 'Gallina Blanca',
        artwork: 'C/ Eduardo Dato',
        contacto: 'María',
        estado: 'TERMINADO',
    },
    {
        id: 'sds6d',
        nombre: 'Proyecto LUNA',
        fecha: '23/01/2020',
        archivos: '666555444',
        informe: 'sdfsd@dsd.com',
        cliente: 'Findus',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Pedro',
        estado: 'ESPERANDO CIERRE',
    },
    {
        id: 's234dsd',
        nombre: 'Proyecto JUPITER',
        fecha: '14/06/2019',
        archivos: '666555444',
        informe: 'sdfsd@dsd.com',
        cliente: 'Danone',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Susana',
        estado: 'PENDIENTE INFO',
    },
    {
        id: 'sds345d',
        nombre: 'Proyecto SATURNO',
        fecha: '23/12/2019',
        archivos: '666555444',
        informe: 'sdfsd@dsd.com',
        cliente: 'Telepizza',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Alberto',
        estado: 'TERMINADO',
    },
    {
        id: 'sds345d',
        nombre: 'Proyecto URANO',
        fecha: '01/05/2020',
        archivos: '666555444',
        informe: 'sdfsd@dsd.com',
        cliente: 'Gallo',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Marcos',
        estado: 'INFORME DISPONIBLE',
    },
];

@Component({
    selector: 'sb-proyectos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './proyectos.component.html',
    styleUrls: ['proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
    displayedColumns: string[] = [
        'nombre',
        'fecha',
        'archivos',
        'informe',
        'cliente',
        'artwork',
        'contacto',
        'estado',
    ];
    dataSource: MatTableDataSource<Proyecto>;

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort!: MatSort;

    constructor() {
        // Create 100 users
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
