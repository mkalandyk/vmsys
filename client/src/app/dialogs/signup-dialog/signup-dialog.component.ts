import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/modules/user/user.service';
import { ToasterService, ToasterModule, ToasterConfig} from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {

  user: any;

  constructor(
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<SignupDialogComponent>,
    private userService: UserService) {
      this.user = {username: 'username', password: 'password', email: 'email'};
    }

  onSubmitClick() {
    if (this.user.username === 'username' || this.user.password === 'password' || this.user.mail === 'email') {
      this.toasterService.pop('error', 'Error', 'Please enter valid credentials');
    } else {
      this.userService.registerNewUser(this.user).subscribe((response) => {
        if (response === true) {
          this.toasterService.pop('success', 'Account created!', 'You can now log in.');
        } else {
          this.toasterService.pop('error', 'Error', 'Creating account failed');
        }
        this.dialogRef.close();
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
