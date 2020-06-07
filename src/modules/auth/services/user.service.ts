import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor() {
        this.user = {
            id: 'dsfg',
            nombre: 'dfgh',
            apellidos: 'fdghdf',
            telefono: '45645',
            empresa: 'dfghdfg',
            email: 'sdfgs',
            pass: 'sdfgsd'
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
