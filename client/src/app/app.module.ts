import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule, MatListModule,
  MatProgressSpinnerModule, MatDialogModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './core/app.routing.module';
import { AppComponent } from './app.component';
import { VendingMachineService } from './modules/vending-machine/vending-machine.service';
import { VendingMachineListComponent } from './components/vending-machine-list/vending-machine-list.component';
import { UserService } from './modules/user/user.service';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { WrongCredentialsDialogComponent } from './dialogs/wrong-credentials-dialog/wrong-credentials-dialog.component';
import { AboutDialogComponent } from './dialogs/about-dialog/about-dialog.component';
import { VendingMachineDetailsComponent } from './components/vending-machine-details/vending-machine-details.component';
import { MachinesComponent } from './components/machines/machines.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    VendingMachineListComponent,
    LoginComponent,
    AdminPanelComponent,
    WrongCredentialsDialogComponent,
    AboutDialogComponent,
    VendingMachineDetailsComponent,
    MachinesComponent,
    OrderListComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    ScrollingModule,
    AppRoutingModule
  ],
  providers: [VendingMachineService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [WrongCredentialsDialogComponent, AboutDialogComponent]
})
export class AppModule { }
