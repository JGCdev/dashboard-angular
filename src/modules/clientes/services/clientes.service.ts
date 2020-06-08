import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from '@modules/auth/services';
import { User } from '@modules/auth/models';

@Injectable()
export class ClientesService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, public router: Router) {}

    getClientes(): Observable<any> {
        const api = `${environment.apiEndPoint}/users`;
        return this.http.get(api);
    }

    updateClient() {

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

}
