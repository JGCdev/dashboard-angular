import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable()
export class AuthService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser: User | undefined;

    constructor(private http: HttpClient, public router: Router) {}

    registro(user: User): Observable<any> {
        console.log('User: ', user);
        const api = `${environment.apiEndPoint}/users`;
        return this.http.post(api, user);
    }

    // Sign-in
    login(user: User) {
        console.log('User: ', user);
        return this.http.post<any>(`${environment.apiEndPoint}/login`, user);
    }

    // User profile
    getUserProfile(id: string): Observable<any> {
        const api = `${environment.apiEndPoint}/users/${id}`;
        return this.http.get(api, { headers: this.headers }).pipe(
            map<any, any>((res: Response) => {
                return res || {};
            }),
            catchError(this.handleError)
        );
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    getUser(): any {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    get isLoggedIn(): boolean {
        const authToken = localStorage.getItem('access_token');
        return authToken !== null ? true : false;
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.router.navigate(['auth/login']);
    }

    // Error
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
    }
}
