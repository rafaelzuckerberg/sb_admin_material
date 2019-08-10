import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component'; 
import { ListAdministratorComponent } from './user/administrator/list-administrator/list-administrator.component';
import { ListCustomerComponent } from './user/customer/list-customer/list-customer.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'dashboard/administradores',
                component: ListAdministratorComponent
            },
            {
                path: 'dashboard/clientes',
                component: ListCustomerComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
