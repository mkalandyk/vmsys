import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AboutDialogComponent>
  ) { }

  onOkClick() {
    this.dialogRef.close();
  }

}
