import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

export const containers = [
    ProyectosComponent,
    AddProyectoComponent,
    ArchivosComponent,
];

export * from './proyectos/proyectos.component';
export * from './add-proyecto/add-proyecto.component';
export * from './archivos/archivos.component';
