import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password);
  }

}
