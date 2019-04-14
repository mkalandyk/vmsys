import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../modules/user/user.service';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../../dialogs/about-dialog/about-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private aboutDialog: MatDialog) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password);
  }

  about() {
    const dialogRef = this.aboutDialog.open(AboutDialogComponent, {
      height: '250px',
      width: '300px',
    });
  }

}
