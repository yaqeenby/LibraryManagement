import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ActiveRouteGuard } from './guards/active-route.guard';
import { ActiveRouting } from './enums/active-routing.enum';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      {
        path: 'books',
        canMatch: [ActiveRouteGuard],
        data: { activeRoute: ActiveRouting.Books },
        loadChildren: () =>
          import('../app/modules/books/books.module').then(
            (m) => m.BooksModule
          ),
      },
      {
        path: 'categories',
        canMatch: [ActiveRouteGuard],
        data: { activeRoute: ActiveRouting.Categories },
        loadChildren: () =>
          import('../app/modules/categories/categories.module').then((m) => m.CategoriesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
