import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { WrongCredentialsDialogComponent } from 'src/app/wrong-credentials-dialog/wrong-credentials-dialog.component';

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
    var result : boolean;
    const req = this.http.post('//localhost:8080/login', {
      'username': username,
      'password': password
    })
    .subscribe(
      res => {
        if(res != null) {
          var user = JSON.parse(JSON.stringify(res));
          if(user.username == username) {
            this.router.navigate(["admin-panel"]);
          } else {
            const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
              height: '150px',
              width: '200px',
            });
          }
        } else {
          const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
            height: '150px',
            width: '200px',
          });
        }
      },
      err => {
        const dialogRef = this.dialog.open(WrongCredentialsDialogComponent, {
          height: '150px',
          width: '200px',
        });
      }
    );
    return result;
  };

}