import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sb-archivos',
    templateUrl: './archivos.component.html',
    styleUrls: ['archivos.component.scss'],
})
export class ArchivosComponent implements OnInit {
    id: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
        });
    }
}
