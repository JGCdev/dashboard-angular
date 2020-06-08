import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-add-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-clientes.component.html',
    styleUrls: ['add-clientes.component.scss'],
})
export class AddClientesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
