import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { WrongCredentialsDialogComponent } from 'src/app/dialogs/wrong-credentials-dialog/wrong-credentials-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog) {
  }

  login(username: string, password: string) {
    let result : boolean;
    const req = this.http.post('//localhost:8080/login', {
      'username': username,
      'password': password
    })
    .subscribe(
      res => {
        if (res != null) {
          const user = JSON.parse(JSON.stringify(res));
          if (user.username === username) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['admin-panel']);
          } else {
            localStorage.removeItem('user');
            const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
              height: '150px',
              width: '200px',
            });
          }
        } else {
          localStorage.removeItem('user');
          const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
            height: '150px',
            width: '200px',
          });
        }
      },
      err => {
        localStorage.removeItem('user');
        const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
          height: '150px',
          width: '200px',
        });
      }
    );
    return result;
  }

}