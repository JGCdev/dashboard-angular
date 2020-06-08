/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ClientesModule } from './clientes.module';

/* Containers */
import * as clientesContainers from './containers';

import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: clientesContainers.ClientesComponent,
        data: {
            title: 'Clientes - Step Levels',
            breadcrumbs: [
                {
                    text: 'Clientes',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'add-cliente',
        canActivate: [AuthGuard],
        component: clientesContainers.AddClientesComponent,
        data: {
            title: 'Añadir Cliente - Step Levels',
            breadcrumbs: [
                {
                    text: 'Clientes',
                    link: '/clientes',
                },
                {
                    text: 'Añadir Cliente',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ClientesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ClientesRoutingModule {}
