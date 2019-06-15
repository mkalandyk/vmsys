import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../modules/user/user.service';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../../dialogs/about-dialog/about-dialog.component';
import { SignupDialogComponent } from 'src/app/dialogs/signup-dialog/signup-dialog.component';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-center',
    animation: 'fade',
  });


  constructor(
    private router: Router,
    private userService: UserService,
    private aboutDialog: MatDialog,
    private signupDialog: MatDialog) { }

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

  signUp() {
    const dialogRef = this.signupDialog.open(SignupDialogComponent, {
      height: '300px',
      width: '400px',
    });
  }
}
