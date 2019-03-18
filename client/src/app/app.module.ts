import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule, MatListModule, MatCard, MatProgressSpinnerModule, MatDialogModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./core/app.routing.module";
import { AppComponent } from './app.component';
import { VendingMachineService } from './shared/vending-machine/vending-machine.service';
import { VendingMachineListComponent } from './vending-machine-list/vending-machine-list.component';
import { UserService } from "./shared/user/user.service";
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WrongCredentialsDialogComponent } from './wrong-credentials-dialog/wrong-credentials-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    VendingMachineListComponent,
    LoginComponent,
    AdminPanelComponent,
    WrongCredentialsDialogComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule, 
    MatListModule,
    MatToolbarModule, 
    MatCardModule, 
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [VendingMachineService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [WrongCredentialsDialogComponent]
})
export class AppModule { }
