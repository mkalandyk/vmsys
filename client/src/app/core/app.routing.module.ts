import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

const routes: Routes = [
    { path: 'admin-panel', component: AdminPanelComponent},
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], 
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {}