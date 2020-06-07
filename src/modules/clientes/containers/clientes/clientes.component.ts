import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './clientes.component.html',
    styleUrls: ['clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
