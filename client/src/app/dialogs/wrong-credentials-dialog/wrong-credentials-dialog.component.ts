import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-wrong-credentials-dialog',
  templateUrl: './wrong-credentials-dialog.component.html',
  styleUrls: ['./wrong-credentials-dialog.component.css']
})
export class WrongCredentialsDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<WrongCredentialsDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
