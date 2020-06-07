import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    user: User;
    constructor(public as: AuthService) {
        this.user = this.as.getUser();
    }

    logout() {
        this.as.logout();
    }
    ngOnInit() {}
}
