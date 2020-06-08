/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Containers */
import * as proyectosContainers from './containers';

import { AuthGuard } from '@modules/auth/guards';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        MaterialModule,
    ],
    providers: [AuthGuard],
    declarations: [...proyectosContainers.containers],
    exports: [...proyectosContainers.containers],
})
export class ProyectosModule {}
