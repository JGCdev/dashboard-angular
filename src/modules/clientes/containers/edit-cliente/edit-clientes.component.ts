import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-edit-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-clientes.component.html',
    styleUrls: ['edit-clientes.component.scss'],
})
export class EditClientesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
