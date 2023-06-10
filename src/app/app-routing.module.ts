import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './components/layouts/layout-client/layout-client.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      {path: '', redirectTo: 'product-list', pathMatch: 'full'},
      {path: 'product-list', component: ProductListComponent},
      {path: 'product-create', component: ProductCreateComponent},
      {path: 'product-update/:id', component: ProductUpdateComponent},
      {path: 'product-detail/:id', component: ProductDetailComponent},
      {path: 'about', component: AboutComponent},

    ],
    
  },
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
