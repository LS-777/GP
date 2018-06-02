import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private _baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get(this._baseUrl + 'user/' + userId);
  }

  editUser(userId, userData) {
    return this.http.post(this._baseUrl + 'edit/' + userId, userData);
  }

  removeUser(userId) {
    return this.http.delete(this._baseUrl + 'remove/' + userId);

  }


}
