import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-add-proyecto',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-proyecto.component.html',
    styleUrls: ['add-proyecto.component.scss'],
})
export class AddProyectoComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
