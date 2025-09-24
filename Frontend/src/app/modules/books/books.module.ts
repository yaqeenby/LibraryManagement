import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  providers: []
})
export class BooksModule { }
