import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { MachinesComponent } from '../components/machines/machines.component';
import { OrderListComponent } from '../components/order-list/order-list.component';
import { SuppliesComponent } from '../components/supplies/supplies.component';
import { WarehouseComponent } from '../components/warehouse/warehouse.component';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';

const routes: Routes = [
    { path: 'machines', component: MachinesComponent},
    { path: 'warehouses', component: WarehouseComponent},
    { path: 'order-list', component: OrderListComponent},
    { path: 'supply-schedule', component: SuppliesComponent},
    { path: 'admin-panel', component: AdminPanelComponent},
    { path: 'login', component: LoginComponent },
    { path: 'forbidden', component: ForbiddenComponent },
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
export class AppRoutingModule { }
