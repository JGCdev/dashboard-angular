/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard - Grey Levels',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [AuthGuard],
        component: dashboardContainers.DashboardComponent,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
