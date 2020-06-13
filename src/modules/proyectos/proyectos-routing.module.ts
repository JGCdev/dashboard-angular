/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ProyectosModule } from './proyectos.module';

/* Containers */
import * as proyectosContainers from './containers';

import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: proyectosContainers.ProyectosComponent,
        data: {
            title: 'Proyectos - Grey Levels',
            breadcrumbs: [
                {
                    text: 'Proyectos',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'crear-proyecto',
        canActivate: [AuthGuard],
        component: proyectosContainers.AddProyectoComponent,
        data: {
            title: 'Añadir proyecto - Grey Levels',
            breadcrumbs: [
                {
                    text: 'Proyectos',
                    link: '/proyectos',
                },
                {
                    text: 'Añadir Proyecto',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'archivos/:id',
        canActivate: [AuthGuard],
        component: proyectosContainers.ArchivosComponent,
        data: {
            title: 'Archivos - Grey Levels',
            breadcrumbs: [
                {
                    text: 'Proyectos',
                    link: '/proyectos',
                },
                {
                    text: 'Archivos',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ProyectosModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ProyectosRoutingModule {}
