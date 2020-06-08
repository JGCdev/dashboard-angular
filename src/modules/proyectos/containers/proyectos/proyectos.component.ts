import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@modules/auth/models';

const users: User[] = [
    {
        id: 'sdsd',
        nombre: 'Jesús',
        apellidos: 'Giménez',
        telefono: '666555444',
        email: 'sdfsd@dsd.com',
        empresa: 'Hiberus Tecnología',
        direccion: 'C/ Eduardo Dato',
        admin: false,
        fechaIngreso: '',
        pass: '',
    },
    {
        id: 'sdsd34',
        nombre: 'Jose',
        apellidos: 'Giménez',
        telefono: '666555444',
        email: 'sdfsd@dsd.com',
        empresa: 'Hiberus Tecnología',
        direccion: 'C/ Eduardo Dato',
        admin: false,
        fechaIngreso: '',
        pass: '',
    },
    {
        id: 'sd345sd',
        nombre: 'Alberto',
        apellidos: 'Giménez',
        telefono: '666555444',
        email: 'sdfsd@dsd.com',
        empresa: 'Hiberus Tecnología',
        direccion: 'C/ Eduardo Dato número 18, 2º izd',
        admin: false,
        fechaIngreso: '',
        pass: '',
    },
    {
        id: 'sd5435sd',
        nombre: 'Marcos',
        apellidos: 'Giménez',
        telefono: '666555444',
        email: 'sdfsd@dsd.com',
        empresa: 'Hiberus Tecnología',
        direccion: 'C/ Eduardo Dato',
        admin: false,
        fechaIngreso: '',
        pass: '',
    },
    {
        id: 'sds345d',
        nombre: 'Pedro',
        apellidos: 'Giménez',
        telefono: '666555444',
        email: 'sdfsd@dsd.com',
        empresa: 'Hiberus Tecnología',
        direccion: 'C/ Eduardo Dato',
        admin: false,
        fechaIngreso: '',
        pass: '',
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
        'apellidos',
        'telefono',
        'email',
        'empresa',
        'direccion',
        'admin',
    ];
    dataSource: MatTableDataSource<User>;

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
