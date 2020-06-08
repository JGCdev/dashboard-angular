import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@modules/auth/models';

import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clientes.component.html',
    styleUrls: ['clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
    displayedColumns: string[] = [
        'nombre',
        'apellidos',
        'telefono',
        'email',
        'empresa',
        'direccion',
        'admin',
        'actions',
    ];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort!: MatSort;

    constructor(private cs: ClientesService, private router: Router) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.getClientes();

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getClientes() {
        this.cs.getClientes().subscribe(res => {
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

    edit(id: string) {
        this.router.navigate(['clientes/editar-cliente/' + id]);
    }

    delete(id: string) {
        this.cs.deleteClient(id).subscribe(
            res => {
                // Meter alertas
                console.log('Usuario eliminado', res);
                this.getClientes();

            },
            err => {
                console.log('Error al eliminar usuario', err);
            }
        );
    }

    view() {
        console.log('view');
    }
}
