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
import { MaterialModule } from '@app/material/material.module';
import { DialogConfirmationComponent } from '@common/components';

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
    providers: [...clientesServices.services, ...clientesGuards.guards, AuthGuard],
    declarations: [...clientesContainers.containers],
    exports: [...clientesContainers.containers],
    entryComponents: [DialogConfirmationComponent],
})
export class ClientesModule {}
