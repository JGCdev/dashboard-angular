import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ClientesService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, public router: Router) {}

    getClientes(): Observable<any> {
        const api = `${environment.apiEndPoint}/users`;
        return this.http.get(api);
    }

    updateClient(data: any) {
        const api = `${environment.apiEndPoint}/users`;
        return this.http.put(api, data);
    }

    deleteClient(id: string) {
        const api = `${environment.apiEndPoint}/users/${id}`;
        return this.http.delete(api);
    }

    registro(user: User): Observable<any> {
        console.log('User: ', user);
        const api = `${environment.apiEndPoint}/users`;
        return this.http.post(api, user);
    }

    getCliente(id: any): Observable<any> {
        const api = `${environment.apiEndPoint}/users/${id}`;
        return this.http.get(api);
    }
}
