import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProyectosService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');

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

    registro(project: User): Observable<any> {
        console.log('projects: ', project);
        const api = `${environment.apiEndPoint}/projects`;
        return this.http.post(api, project);
    }

    getProject(id: any): Observable<any> {
        const api = `${environment.apiEndPoint}/projects/${id}`;
        return this.http.get(api);
    }
}
