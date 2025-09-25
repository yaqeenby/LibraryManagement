import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // default route
  {
    path: 'list',
    component: BooksListComponent,
  //  resolve: { books: BooksResolver } 
  },
//  { path: 'add-book', component: AddBookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
