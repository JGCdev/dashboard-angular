import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '@modules/proyectos/models';

const users: Proyecto[] = [
    {
        id: '12sdsd',
        preview: './assets/img/danone-preview.png',
        nombre: 'Proyecto SOL',
        fecha: '23/06/220',
        informe: 'sdfsd@dsd.com',
        cliente: 'Gallina Blanca',
        artwork: 'C/ Eduardo Dato',
        contacto: 'María',
        estado: '0',
        nombreDis: '',
        packaging: '',
        material: '',
        impresor: '',
        tipoArchivo: '',
    },
    {
        id: 'sds6d',
        preview: './assets/img/thumb_placeholder.jpg',
        nombre: 'Proyecto LUNA',
        fecha: '23/01/2020',
        informe: 'sdfsd@dsd.com',
        cliente: 'Findus',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Pedro',
        estado: '1',
        nombreDis: '',
        packaging: '',
        material: '',
        impresor: '',
        tipoArchivo: '',
    },
    {
        id: 's234dsd',
        preview: './assets/img/thumb_placeholder.jpg',
        nombre: 'Proyecto JUPITER',
        fecha: '14/06/2019',
        informe: 'sdfsd@dsd.com',
        cliente: 'Danone',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Susana',
        estado: '2',
        nombreDis: '',
        packaging: '',
        material: '',
        impresor: '',
        tipoArchivo: '',
    },
    {
        id: 'sds345d',
        preview: './assets/img/yatekomo.jpg',
        nombre: 'Proyecto SATURNO',
        fecha: '23/12/2019',
        informe: 'sdfsd@dsd.com',
        cliente: 'Telepizza',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Alberto',
        estado: '0',
        nombreDis: '',
        packaging: '',
        material: '',
        impresor: '',
        tipoArchivo: '',
    },
    {
        id: 'sds345d',
        preview: './assets/img/thumb_placeholder.jpg',
        nombre: 'Proyecto URANO',
        fecha: '01/05/2020',
        informe: 'sdfsd@dsd.com',
        cliente: 'Gallo',
        artwork: 'C/ Eduardo Dato',
        contacto: 'Marcos',
        estado: '3',
        nombreDis: '',
        packaging: '',
        material: '',
        impresor: '',
        tipoArchivo: '',
    },
];

@Component({
    selector: 'sb-proyectos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './proyectos.component.html',
    styleUrls: ['proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
    fases = [
        {
            text: 'Terminado',
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
