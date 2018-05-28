import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData;
  constructor(private _auth: AuthService, private _user: UserService) { }

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
    });
  }

  deleteUser() {
    this._user.removeUser(this._auth.userId).subscribe(res => {
      this._auth.logoutUser();
      console.log(res);
    });
  }

}
