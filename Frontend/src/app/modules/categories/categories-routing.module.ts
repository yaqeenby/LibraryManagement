import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // default route
  {
    path: 'list', component: CategoriesListComponent
  },
  {
    path: 'details/:id', component: CategoryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
