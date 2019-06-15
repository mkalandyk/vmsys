import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent {

  private user: any;

  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onOkClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.userService.modifyUserdata(this.user);
    this.dialogRef.close();
  }
}
