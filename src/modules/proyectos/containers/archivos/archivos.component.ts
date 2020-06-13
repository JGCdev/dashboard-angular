import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '@modules/proyectos/services';

@Component({
    selector: 'sb-archivos',
    templateUrl: './archivos.component.html',
    styleUrls: ['archivos.component.scss'],
})
export class ArchivosComponent implements OnInit {
    id: any;
    constructor(private route: ActivatedRoute, private ps: ProyectosService) {}

    // Fix no nos hace falta el id en la ruta - ver como corregir
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
        });

        console.log('Proyecto seleccionado: ', this.ps.proyectoSelected);
    }
}
