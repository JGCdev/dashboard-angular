import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Proyecto } from '../models';

@Injectable()
export class ProyectosService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    proyectoSelected: Proyecto | undefined;

    constructor(private http: HttpClient, public router: Router) {}

    getProyectos(): Observable<any> {
        const api = `${environment.apiEndPoint}/projects`;
        return this.http.get(api);
    }

    updateProject(data: any) {
        const api = `${environment.apiEndPoint}/projects`;
        return this.http.put(api, data);
    }

    deleteProject(id: string) {
        const api = `${environment.apiEndPoint}/projects/${id}`;
        return this.http.delete(api);
    }

    registro(project: Proyecto, archivo: any): Observable<any> {
        const formData = new FormData();
        formData.append('file', archivo);
        formData.append('datos', JSON.stringify(project));
        const api = `${environment.apiEndPoint}/projects`;
        return this.http.post(api, formData);
    }

    getProject(id: any): Observable<any> {
        const api = `${environment.apiEndPoint}/projects/${id}`;
        return this.http.get(api);
    }
}
