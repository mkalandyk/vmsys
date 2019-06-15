import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AccountDialogComponent } from 'src/app/dialogs/account-dialog/account-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private accountDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  menuPick(id) {
    if (id === 'login') {
      localStorage.removeItem('user');
    }
    if (id === 'account') {
      const dialogRef = this.accountDialog.open(AccountDialogComponent, {
        height: '300px',
        width: '400px',
      });
    } else {
      this.router.navigate([id]);
    }
  }
}
