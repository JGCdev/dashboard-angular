import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser: User | undefined;

    constructor(private http: HttpClient, public router: Router) {}

    registro(user: User): Observable<any> {
        console.log('User: ', user);
        const api = `${environment.apiEndPoint}/register-user`;
        return this.http.post(api, user).pipe(catchError(this.handleError));
    }

    // Sign-in
    login(user: User) {
        console.log('User: ', user);
        return this.http
            .post<any>(`${environment.apiEndPoint}/login`, user)
            .subscribe((res: any) => {
                localStorage.setItem('access_token', res.token);
                this.getUserProfile(res._id).subscribe((response: any) => {
                    this.currentUser = response;
                    localStorage.setItem('user', JSON.stringify(response));
                    console.log('Current user: ', this.currentUser);
                    console.log('navegamos a pagina principal');
                    this.router.navigate(['dashboard']);
                });
            });
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
