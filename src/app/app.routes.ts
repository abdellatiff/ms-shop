import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ProductComponent } from './pages/products/product.component';
import { authorizationGuard } from './guard/authorization.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { authenticationGuard } from './guard/authentication.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'dashboard',
        canActivate: [authenticationGuard],  // Apply authentication to all child routes
        children: [
          { path: 'customer', component: CustomerComponent, canActivate: [authorizationGuard] }, // Authorization for admin access
          { path: 'products', component: ProductComponent }, // No additional authorization needed
        ]
      },
    {path: 'unauthorized', component: UnauthorizedComponent}

];
