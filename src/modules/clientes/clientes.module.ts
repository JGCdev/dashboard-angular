/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Containers */
import * as clientesContainers from './containers';

/* Guards */
import * as clientesGuards from './guards';

/* Services */
import * as clientesServices from './services';
import { AuthGuard } from '@modules/auth/guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...clientesServices.services, ...clientesGuards.guards, AuthGuard],
    declarations: [...clientesContainers.containers],
    exports: [...clientesContainers.containers],
})
export class ClientesModule {}
