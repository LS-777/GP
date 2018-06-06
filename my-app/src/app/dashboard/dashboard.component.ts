import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userData;
  constructor(private _auth: AuthService, private _user: UserService, private _router: Router) { }

  ngOnInit() {
    this._user.getUser(this._auth.userId).subscribe(res => {
      this.userData = res;
      console.log(res);
    });
  }

  saveUser() {
    this._user.editUser(this._auth.userId, this.userData).subscribe(res => {
      this.userData = res;
      console.log(res);
      alert('Infos successfully changed!');
    });
  }

  deleteUser() {
    this._user.removeUser(this._auth.userId).subscribe(res => {
      this._auth.logoutUser();
      alert('Bye');
      console.log(res);
      this._router.navigate(['/home']);
    });
  }
}
